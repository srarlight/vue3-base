/// <reference types="vite/client" />
declare type ApiReturnType<T extends Function> = Awaited<ReturnType<T>>
declare type LabelValueType = { label: string; value: string | number }
declare module '*.vue' {
    import { defineComponent } from 'vue'
    const Component: ReturnType<typeof defineComponent>
    export default Component
  }