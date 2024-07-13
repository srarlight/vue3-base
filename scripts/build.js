import { resolve } from 'path'
import { createReadStream, createWriteStream } from 'fs'
import { outputFile, readdirSync, lstatSync } from 'fs-extra'
// 引入 vite 的 build 方法，进行编译构建
import { defineConfig, build } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import { version } from '../package.json'

// 基础配置
const baseConfig = defineConfig({
  publicDir: false,
  plugins: [vue(), vueJSX()],
})
const rollupOptions = defineConfig({
  // that shouldn't be bundled
  external: ['vue'],
  globals: {
    vue: 'Vue',
  },
})
// 组件库全局入口
const componetsDir = resolve(__dirname, '../packages/components')
// 输出目录
const outputDir = resolve(__dirname, '../build')
// 生成 package.json
const createPackageJson = (name) => {
  const fileStr = `{
    "name": "${name ? name : 'pc-vue3-ui'}",
    "version": "${version}",
    "description": "Vue3组件库，beta版本仅用来测试发布",
    "main": "${name ? 'index.umd.js' : 'pc-vue3-ui.umd.js'}",
    "module":"${name ? 'index.mjs' : 'pc-vue3-ui.mjs'}",
    "repository": {
      "type": "git",
      "url": "git+https://github.com/GGXXMM/vue3-ui.git"
    },
    "keywords": ["vue3", "组件库", "UI"],
    "author": "guoxinming",
    "license": "ISC"
  }
  `
  // 单个组件 or 全量
  const filePath = resolve(outputDir, name ? `${name}/package.json` : 'package.json')

  outputFile(filePath, fileStr, 'utf-8')
}

/** 单组件按需构建 */
const buildSingle = async (name) => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        lib: {
          entry: resolve(compontsDir, name),
          name: 'index',
          fileName: 'index',
          formats: ['es', 'umd'],
        },
        rollupOptions,
        outDir: resolve(outputDir, name),
      },
    }),
  )

  createPackageJson(name)
}

/** 全量构建 */
const buildAll = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        lib: {
          entry: compontsDir,
          name: 'pc-vue3-ui',
          fileName: 'pc-vue3-ui',
          formats: ['es', 'umd'],
        },
        rollupOptions,
        outDir: outputDir,
      },
    }),
  )

  createPackageJson()
}

// copy文件
// README.md
// 样式 index.css
const copyFiles = () => {
  const markdown = createReadStream(resolve(__dirname, '../README.md'))
  const style = createReadStream(resolve(__dirname, '../packages/theme-chalk/index.css'))
  markdown.pipe(createWriteStream(resolve(__dirname, '../build/README.md')))
  style.pipe(createWriteStream(resolve(__dirname, '../build/index.css')))
}

const buildLib = async () => {
  await buildAll()

  // 按需打包
  readdirSync(compontsDir)
    .filter((name) => {
      // 获取组件的目录
      const componentDir = resolve(compontsDir, name)
      const isDir = lstatSync(componentDir).isDirectory()
      return isDir && readdirSync(componentDir).includes('index.ts')
    })
    .forEach(async (name) => {
      await buildSingle(name)
    })

  copyFiles()
}

buildLib()
