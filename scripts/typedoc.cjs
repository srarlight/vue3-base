const TypeDoc = require("typedoc");
const path = require("path");
const fs = require("fs");

// 根目录
function rootPath(...args) {
  return path.join(__dirname, "..", ...args);
}

console.log(rootPath("src/index.ts"));

// 主函数
async function main() {
  // 初始化 TypeDoc
  const app = new TypeDoc.Application();

  // 使 TypeDoc 拥有读取 tsconfig.json 的能力
  app.options.addReader(new TypeDoc.TSConfigReader());

  // 指定代码入口
  const entries = [rootPath("src/index.ts")];

  // 指定 TypeDoc 配置项
  app.bootstrap({
    entryPoints: entries,
    tsconfig: rootPath("tsconfig.json"),
    plugin: ["typedoc-plugin-markdown"],
    allReflectionsHaveOwnDocument: true,
  });

  const project = app.convert();

  if (project) {
    // 输出产物位置
    const outputDir = path.join(__dirname, "dist");

    // 生成文档内容
    await app.generateDocs(project, outputDir);

    // 生成文档数据结构
    const jsonDir = path.join(outputDir, "documentation.json");
    await app.generateJson(project, jsonDir);

    // 解析数据结构，生成 VitePress Config 所需的 Sidebar 配置项
    await resolveConfig(jsonDir);
  }
}

main().catch(console.error);
