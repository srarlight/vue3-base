import type { App } from 'vue'
export * from './license-plate-number'


const modules: Record<string, any> = import.meta.glob('./*/index.ts', {
  eager: true,
})
const install = (app: App) => {
  for (const path in modules) {
    modules[path].default.install?.(app)
  }
}
export default { install }
