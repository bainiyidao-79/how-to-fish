# How to Fish · 操作日志

> 所有 game-* 技能的操作记录。新站项目文件夹：`how-to-fish-v2/`（旧 `how-to-fish/` 内代码保留未动）。

---
### 2026-08-29 21:00:00 | Step 01 | game-site-assemble（调研）
- **入参**: 游戏=How to Fish (Steam 4001890)，骨架=youtube-video-wiki
- **操作**: 读取素材评估报告、关键词、setting.md、骨架索引；确认旧 question-wiki 代码为废弃品（扬哥确认）
- **结果**: ✅ 完成。素材可用=3 篇（intro x2 + release x1），guide 类为现实钓鱼内容弃用
- **异常**: 无

---
### 2026-08-29 21:15:00 | Step 02 | 密钥入库
- **入参**: GitHub Token（用户提供）
- **操作**: 写入 `/home/admin/Documents/game-sites/.env`（GITHUB_TOKEN），chmod 600
- **结果**: ✅ 保存成功。密钥唯一固定位置：`/home/admin/Documents/game-sites/.env`
- **异常**: 无

---
### 2026-08-29 21:20:00 | Step 03 | game-site-assemble（骨架装配）
- **入参**: 骨架源=`/home/admin/Documents/skeletons/youtube-video-wiki/` → 目标=`how-to-fish-v2/`
- **操作**: rsync 复制骨架（排除 node_modules/.next）
- **结果**: ✅ 复制完成
- **异常**: ⚠️ 发现骨架重大缺口：① `src/lib/` 内容加载层完全为空 ② `src/app/globals.css` 不存在（layout.tsx 有引用）③ 无 postcss.config.mjs ④ 文章页为占位符代码

---
### 2026-08-29 21:30:00 | Step 04 | game-site-assemble（补全内容加载层）
- **入参**: 参考 how-to-fish 旧项目 content.ts（gray-matter 方案）
- **操作**: 新建 `src/lib/content.ts`（listSections/listArticles/getArticle/getSectionLabel/listAllArticlePaths）；重写 `[section]/page.tsx`、`[section]/[slug]/page.tsx` 接入真实内容；选用 marked 渲染 markdown→HTML（内容为纯 markdown，无需 MDX 组件）
- **结果**: ✅ 完成
- **异常**: 无

---
### 2026-08-29 21:35:00 | Step 05 | game-site-assemble（补全 CSS 层）
- **入参**: 组件所用 token：background/foreground/muted/primary/border/card
- **操作**: 新建 `src/app/globals.css`（Tailwind v4 `@import "tailwindcss"` + `@theme` token + 自写 prose 排版样式）；新建 `postcss.config.mjs`（@tailwindcss/postcss）；package.json 增加 gray-matter/marked/@tailwindcss/postcss
- **结果**: ✅ 完成
- **异常**: 无

---
### 2026-08-29 21:40:00 | Step 06 | game-content-writer（内容生成）
- **入参**: 素材=关键词素材/（intro 116K + release 56K），YouTube 视频 ID=BFwwWlf9qGQ
- **操作**: 提取真实事实（发行 2026-08-20、Dazed Games、1-4 人物理钓鱼、特性清单、38% 首发折扣）；撰写 3 篇英文页面：`intro/how-to-fish-game.mdx`、`intro/how-to-fish-game-steam.mdx`、`release/how-to-fish-game-release-date.mdx`；配置 site.ts（导航 3 链接全有真实内容、FAQ 4 条基于事实、heroVideo=BFwwWlf9qGQ、Steam 官方链接）
- **结果**: ✅ 完成。遵循扬哥方法论：不设字数硬指标、忠于素材、无虚构
- **异常**: 首篇 MDX 内 iframe 误用 JSX 语法（style={{}}），已改标准 HTML style 属性

---
### 2026-08-29 21:50:00 | Step 07 | 本地验证
- **入参**: npm install / verify / build
- **操作**: npm install（新增 3 依赖）→ tsc --noEmit → next build
- **结果**: ✅ 构建成功，9 条路由全部静态导出（/ + 2 栏目 + 3 文章 + 404 等）
- **异常**: ① 首次 build 失败：Next.js 15.5 中 params 类型为 Promise，两个页面改为 async/await 后通过 ② `next start` 不支持 output:export，改用静态服务器测试 out/ 目录；curl 验证首页标题、3 篇文章 H1、发行日期、侧边栏导航全部正常

---
### 2026-08-29 21:55:00 | Step 08 | game-deploy-launch（GitHub 推送）
- **入参**: 仓库=bainiyidao-79/how-to-fish（master），本地=how-to-fish-v2
- **操作**: 新建 .gitignore → git init -b master → commit → force push 覆盖旧垃圾代码（扬哥已确认旧内容可清除）
- **结果**: ✅ `dbff767...f634a2c master -> master (forced update)`
- **异常**: 无

---
### 2026-08-29 22:00:00 | Step 09 | game-deploy-launch（Vercel 部署监控）
- **入参**: VERCEL_TOKEN（.env，位置：`/home/admin/Documents/game-sites/.env`）
- **操作**: API 查项目/域名/部署状态；确认项目 how-to-fish 绑定 GitHub 自动部署；域名 howtofish2.wiki + www 均已验证挂载
- **结果**: 🔄 新部署 BUILDING 中（22:00 触发，commit: Rebuild How to Fish wiki）
- **异常**: Playwright 浏览器 Vercel 登录态已失效（跳转登录页）；但 VERCEL_TOKEN API 验证可用（账号 bainiyidao-2328），后续 Vercel 操作优先走 API，浏览器仅作备用
---
