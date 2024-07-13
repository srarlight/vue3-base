<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { alphanumeric, province } from './dict'

export default defineComponent({
  name: 'InputPanel',
  props: {
    isProvinceInput: Boolean,
  },
  emits: ['inputNum'],
  setup(props, { emit, slots }) {
    const keyBoardsActive = ref('')
    const inputNum = (str: string) => {
      emit('inputNum', str)
      keyBoardsActive.value = str
    }
    return () => (
      <div class='vts-input-box'>
        {props.isProvinceInput ? (
          <div class='vts-province-box'>
            {province.map((row) => (
              <div class='vts-plate-num-button-row vts-flex-center'>
                {row.map((el) => (
                  <div
                    class={[
                      'vts-plate-num-button',
                      'vts-flex-center',
                      keyBoardsActive.value === el ? 'vts-plate-num-button-active' : '',
                    ]}
                    key={el}
                    onClick={(e) => {
                      e.stopPropagation()
                      inputNum(el)
                    }}
                  >
                    {el}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div class='vts-alphanumeric-box'>
            {alphanumeric.map((row, rowIndex) => (
              <div class='vts-plate-num-button-row vts-flex-center' key={rowIndex}>
                {row.map((el) => (
                  <div
                    class={[
                      'vts-plate-num-button',
                      'vts-flex-center',
                      keyBoardsActive.value === el ? 'vts-plate-num-button-active' : '',
                    ]}
                    key={el}
                    onClick={(e) => {
                      e.stopPropagation()
                      inputNum(el)
                    }}
                  >
                    {el}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        {slots.default?.()}
      </div>
    )
  },
})
</script>
