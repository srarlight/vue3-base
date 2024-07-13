import VtsLicensePlateNumber from './index.vue'
import './index.scss'
import type { IProps } from './props'

export default VtsLicensePlateNumber
declare module 'vue' {
  export interface GlobalComponents {
    VtsLicensePlateNumber: typeof VtsLicensePlateNumber
  }
}
export type VtsLicensePlateNumberInstance = InstanceType<typeof VtsLicensePlateNumber> & {
  close: () => void
  open: () => void
  delete: () => void
  cancel: () => void
}
export { VtsLicensePlateNumber, type IProps }
