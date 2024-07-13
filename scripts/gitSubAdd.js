'use strict'
import { execSync } from 'child_process'
const repo = process.argv[2]

function exec(cmd) {
  return execSync(cmd).toString().trim()
}

const repoMap = {
  'ecs-app-h5': {
    url: 'git@gitlab.ky-tech.com.cn:erp-frontend/ecs-app-h5.git',
    branch: 'test',
    folder: 'packages/web-vts-app-h5',
  },
  'vts-h5': {
    url: 'git@gitlab.ky-tech.com.cn:KYE-ECS-FRONTEND/vts-h5.git',
    branch: 'test',
    folder: 'packages/web-vts-h5',
  },
  'vts-bq-h5': {
    url: 'git@gitlab.ky-tech.com.cn:KYE-ECS-FRONTEND/vts-bq-h5.git',
    branch: 'test',
    folder: 'packages/web-vts-bq-h5',
  },
  'vts-ks-report': {
    url: 'git@gitlab.ky-tech.com.cn:kuasheng-h5/vts-ks-report.git',
    branch: 'test',
    folder: 'packages/web-vts-ks-report',
  },
  'vts-ks-cargo': {
    url: 'git@gitlab.ky-tech.com.cn:kuasheng-h5/vts-ks-cargo.git',
    branch: 'test',
    folder: 'packages/web-vts-ks-cargo',
  },
  'vts-market-h5': {
    url: 'git@gitlab.ky-tech.com.cn:KYE-ECS-FRONTEND/vts-market-h5.git',
    branch: 'test',
    folder: 'packages/web-vts-market-h5',
  },
  'vts-ks-market-vehicle': {
    url: 'git@gitlab.ky-tech.com.cn:kuasheng-h5/vts-ks-market-vehicle.git',
    branch: 'test',
    folder: 'packages/vts-ks-market-vehicle',
  },
}

const { url, branch, folder } = repoMap[repo] || {}

if (!url) {
  throw new Error(`[error]: 仓库 ${repo} 映射关系不存在`)
}

console.log(`[info]: 开始添加 仓库 ${repo} 到 ${folder} 文件夹`)

const cmd = `git submodule add -b ${branch}  --force ${url}  ${folder}`
console.log(`[exec]: ${cmd}`)
exec(cmd)
