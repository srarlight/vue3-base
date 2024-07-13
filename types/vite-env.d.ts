/// <reference types="vite/client" />
declare type ApiReturnType<T extends Function> = Awaited<ReturnType<T>>
declare type LabelValueType = { label: string; value: string | number }
