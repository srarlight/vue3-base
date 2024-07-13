import { type ExtractPropTypes } from 'vue'

export const props = {
  modelValue: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },

  onchange: {
    type: Function,
  },
}
export type IProps = ExtractPropTypes<typeof props>
