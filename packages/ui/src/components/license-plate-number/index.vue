<script lang="tsx">
import { defineComponent, ref, type Ref, watch, nextTick, type SetupContext } from 'vue'
import InputPanel from './inputPanel.vue'
// import Dot from './assets/dot.png'
import CustomPopup from './CustomPopup.vue'
import { props } from './props'

export default defineComponent({
  name: 'PlateNumInput',
  inheritAttrs: false,
  props,
  emits: ['update:modelValue', 'update:show', 'input-focus', 'input-blur', 'input-change'],
  setup(props, { emit, slots, expose }: SetupContext) {
    const plateNumArr: Ref<string[]> = ref([]) // 车牌号码数组
    const isProvinceInput: Ref<boolean> = ref(true) // 是否为省份输入
    const focusIndex: Ref<number> = ref(-1) // 焦点索引
    const showPopup = ref(props.show) // 弹出窗口显示状态

    function initializePlateNumArray(str: string = '') {
      plateNumArr.value = Array.from({ length: 8 }, (_, index) => str[index] || ' ')
      isProvinceInput.value = str.length === 0
    }

    function handleClose() {
      showPopup.value = false
      emit('update:modelValue', getPlateNumString())
      emit('update:show', false)
    }

    function handleCancel() {
      initializePlateNumArray(props.modelValue || '')
      emit('update:show', false)
      showPopup.value = false
    }

    function getPlateNumString() {
      return plateNumArr.value.join('').trim()
    }

    function handleInputNum(str: string) {
      if (focusIndex.value >= 0 && focusIndex.value < plateNumArr.value.length) {
        plateNumArr.value[focusIndex.value] = str
        if (focusIndex.value < plateNumArr.value.length - 1) {
          focusIndex.value++
        }
        nextTick(() => {
          emit('input-change', getPlateNumString())
          isProvinceInput.value = focusIndex.value === 0
        })
      } else {
        const combinedStr = getPlateNumString() + str
        plateNumArr.value = Array.from({ length: 8 }, (_, index) => combinedStr[index] || ' ')
        isProvinceInput.value = combinedStr.length === 0
        nextTick(() => {
          emit('input-change', combinedStr)
        })
      }
    }
    function handleDeleteNum() {
      if (focusIndex.value === -1) {
        // 如果焦点索引为 -1，则设置为数组的最后一个元素
        focusIndex.value = plateNumArr.value.length - 1
      }
      if (focusIndex.value >= 0 && focusIndex.value < plateNumArr.value.length) {
        plateNumArr.value[focusIndex.value] = ' ' // 设置当前位置为空
        if (focusIndex.value > 0) {
          focusIndex.value--
        }
        nextTick(() => {
          emit('input-change', getPlateNumString())
          isProvinceInput.value = focusIndex.value === 0
        })
      } else {
        const str = getPlateNumString().slice(0, -1) // 去掉最后一个字符
        plateNumArr.value = Array.from({ length: 8 }, (_, index) => str[index] || ' ')
        isProvinceInput.value = str.length === 0
        nextTick(() => {
          emit('input-change', str)
        })
      }
    }

    function handleFocus(index: number) {
      focusIndex.value = index
      isProvinceInput.value = index === 0
      emit('input-focus', index)
    }

    watch(
      () => props.show,
      (flag) => {
        showPopup.value = flag
      },
    )

    watch(
      () => props.modelValue,
      (newValue) => {
        initializePlateNumArray(newValue)
      },
      { immediate: true },
    )

    expose({
      open() {
        showPopup.value = true
      },
      done() {
        handleClose()
      },
      delete() {
        handleDeleteNum()
      },
      cancel() {
        handleCancel()
      },
    })

    return () => (
      <div class='vts-plate-num-popup'>
        <CustomPopup v-model:show={showPopup.value} onClose={handleClose}>
          <div class='vts-plate-num-header'>{slots.header?.()}</div>
          <div class='vts-plate-num-box'>
            {plateNumArr.value.map((item, index) => (
              <>
                <div
                  class={[
                    'vts-plate-num-item',
                    'vts-hairline',
                    focusIndex.value === index ? 'vts-plate-focus' : '',
                    item === ' ' && index === plateNumArr.value.length - 1
                      ? 'vts-plate-placeholder'
                      : '',
                  ]}
                  tabindex='0'
                  key={index}
                  onFocus={() => handleFocus(index)}
                >
                  {item === ' ' && index === plateNumArr.value.length - 1 ? '' : item}
                </div>
                {/* {index === 1 && <img class='vts-dot_image' src={Dot} alt='dot' />} */}
              </>
            ))}
          </div>
          <InputPanel isProvinceInput={isProvinceInput.value} onInputNum={handleInputNum}>
            {slots.footer ? (
              slots.footer()
            ) : (
              <div class='vts-panel-footer'>
                <div class='vts-cancel' onClick={handleCancel}>
                  取消
                </div>
                <div class='vts-panel-footer-right'>
                  <div class='vts-delete' onClick={handleDeleteNum}>
                    删除
                  </div>
                  <div class='vts-finish' onClick={handleClose}>
                    完成
                  </div>
                </div>
              </div>
            )}
          </InputPanel>
        </CustomPopup>
      </div>
    )
  },
})
</script>
