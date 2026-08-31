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
---
### 2026-08-29 22:37:00 | Step 10 | game-skeleton-build（骨架重新拆解与优化）
- **入参**: 源站=vvultimatum.net，工具=GLM 5.3 flash 视觉+HTML分析（替换原 MIMO 2.5 拆解）
- **操作**: ① 抓源站 HTML+CSS 提取真实主题 token（dark 默认 #0a0a0c、多强调色 amber/emerald/blue）② playwright 截图+视觉模型分析布局 ③ 首页结构对照（源站有 Trending/What is/Explore/FAQ/Route CTA，旧骨架缺 3 块）
- **结果**: ✅ 骨架库已重写 6 文件（globals.css/layout/site/HomeView/Header/Footer），新增 glow-top/glow-cta/title-line/eyebrow 工具类
- **异常**: 无
---
### 2026-08-29 22:42:00 | Step 11 | 官方配色提取（讲师方法论落地）
- **入参**: How to Fish Steam 官方头图（素材内已验证 URL）
- **操作**: 直连被网络拦截 → 开 SS 代理（start_collect_env.sh）→ 代理下载头图 460x215 → 立即关外网 → 视觉模型提取配色
- **结果**: ✅ 官方配色：深海蓝灰底 #1F2A36 + 渔夫背带裤橙 #D96C2B + 衬衫紫 #5B2A6B
- **异常**: Steam CDN 直连被拦（162字节拦截页），走代理解决
---
### 2026-08-29 22:48:00 | Step 12 | game-site-assemble（新主题装配）+ 部署
- **入参**: 骨架新文件同步 + 官方配色注入 @theme token + 新区块配置（topNav/trending/gameIntro/ctaBanner 全真实内容）
- **操作**: 构建验证 → 静态服务器+playwright 截图自检 → git push（da681ce）→ Vercel 自动部署
- **结果**: ✅ 部署 READY（22:53），线上验证：html class="dark" + Trending Now + What is + CTA 横幅全部在产线生效
- **异常**: 本地截图 YouTube iframe 空白（无代理环境正常现象，线上视频已被扬哥确认）
---

---
### 2026-08-30 11:00:00 | Step 01 | game-seo-onboard
- **入参**: how-to-fish（howtofish2.wiki），扬哥指令"GSC/GA 登记 + 校验技能设置"
- **操作**: 前置检查——读 SKILL.md → 查 sitemap/robots 状态 → 查 Analytics 组件 → 查 setting.md 参数 → 查技能引用脚本 → 测 SS 代理 Google 路由
- **结果**: 部分通过。sitemap.xml ✅（当日修复，6条URL）；robots ✅；**发现新骨架无 Analytics.tsx（技能假设失效，GA 接不上）**；setting.md 关键参数缺失（Zone ID/Vercel项目/仓库名"待提供"）；gsc_*/ga_* 脚本存在（18个）；SS Google 路由故障
- **异常**: SS 节点到 Google 路由 000（example.com 200 正常，10:45/10:55/11:05 三测均超时；10:00 时 yt-dlp 还正常）
---
### 2026-08-30 11:10:00 | Step 02 | game-seo-onboard
- **入参**: 骨架级修复 + how-to-fish-v2 同步
- **操作**: 骨架新增 src/components/Analytics.tsx（NEXT_PUBLIC_GA_ID 驱动，未配置返回 null，anonymize_ip）+ layout.tsx 接线 + SKELETON.md 文档；同步 how-to-fish-v2 → NEXT_PUBLIC_GA_ID=G-TESTFAKE1 构建验证（G-TESTFAKE1 + googletagmanager 正确内联产物）→ push 71d7723(master)
- **结果**: ✅ 成功。站点侧 GA 准备完成，等 G-XXXX 配 Vercel env + 空提交 redeploy 即生效
- **异常**: 无
---
### 2026-08-30 11:10:00 | Step 03 | game-seo-onboard
- **入参**: GSC 网域属性 howtofish2.wiki
- **操作**: 计划走 GSC 添加网域资源 → Cloudflare TXT 验证 → 提交 sitemap 完整URL
- **结果**: ⏸️ **阻塞**——SS 代理 Google 路由故障，search.google.com 无法访问（三测均失败），GSC/GA 后台操作无法进行
- **异常**: 等代理恢复重试，或扬哥在 GSC 前台操作（选 Cloudflare 自动验证）后告知
---
### 2026-08-30 11:10:00 | Step 04 | game-seo-onboard
- **入参**: GA 媒体资源 How to Fish
- **操作**: 计划走 GA 建资源 → Web 数据流 → 取 G-XXXX → Vercel POST env → 空提交 redeploy → 线上 grep 验证
- **结果**: ⏸️ **阻塞**（同 Step 03，Google 路由故障）；站点侧组件已就绪（Step 02），拿到 G-XXXX 后 10 分钟内可完成
- **异常**: 同 Step 03
---
---
### 2026-08-30 11:30:00 | Step 03(续) | game-seo-onboard
- **入参**: GSC 网域属性 howtofish2.wiki
- **操作**: 代理根因修复后重试 GSC——诊断出 DNS 污染(socks5 本地解析→假IP;改 socks5h/远程解析后 google 204)→chromium-1208 崩溃换 1237→连续 4 个脚本(gsc_howtofish_1~6)进入 GSC:脚本1成功进仪表盘(bigwalk2026.online 概览,中文UI),后续脚本全落 /about 营销页→脚本6提取链接证实:Start now 全部指向 accounts.google.com/ServiceLogin→**谷歌会话已失效(11:13后判定异常登出)**
- **结果**: ⏸️ GSC/GA 后台操作需重新登录谷歌;本机无密码存档,需扬哥协助(远程桌面 :1 登录,或扬哥在自己浏览器完成资源创建+验证,给我 TXT 串/G-XXXX 后其余全自动)
- **异常**: ①pkill/pgrep 自杀坑第3/4次(教训已在案) ②chromium-1208 SIGTRAP 崩溃→换 1237 解决 ③检测逻辑 false-positive(Performance 匹配营销文案)已修 ④技能脚本缺 --host-resolver-rules 的 DNS 污染缺陷已在我脚本修复
---
---
### 2026-08-30 12:55:00 | Step 05 | game-seo-onboard
- **入参**: 扬哥确认已在 :1 远程桌面完成谷歌登录
- **操作**: 登录检测脚本确认 LOGIN_DONE(跳回GSC仪表盘) → 期间发现 howtofish2.wiki 资源已被扬哥添加(未验证) → 点击"验证您的所有权" → DNS向导切换"任何 DNS 提供商"→TXT模式 → 点复制按钮+注入div粘贴读取精确TXT记录(视觉OCR有3字符歧义,粘贴法拿到精确值 google-site-verification=TdRPasLO-GFKc9ypFUlZ-dIvaV9JKdNPc7CPUjgKiHI) → CF API 加 TXT 记录成功(记录ID fda706e10eea) → GSC 点验证 → **已完成所有权验证**
- **结果**: ✅ GSC 网域资源 howtofish2.wiki 验证通过(bainiyidao@gmail.com)
- **异常**: 验证按钮坐标需放大截图精确定位(957,817→955,740 两次试错);CDP 保活浏览器两次超时退出需重启
---
### 2026-08-30 13:00:00 | Step 06 | game-seo-onboard
- **入参**: sitemap 提交 + GA 建资源
- **操作**: sitemap 页输入框(432,227,756×24)填完整URL https://www.howtofish2.wiki/sitemap.xml(原子操作:单连接内输入+校验+提交) → 表格显示"成功,已发现6个网页" → GA 管理页创建媒体资源:名称"How to Fish"(时区中国GMT+8/币种人民币预填) → 行业类别=游戏 → 业务规模=小型 → 业务目标=了解网站流量 → 创建 → 数据流"howtofish"(扬哥在远程桌面协助填写,流ID 15525806804) → **衡量ID G-DT2TP3JVVE**(资源首页横幅直接显示)
- **结果**: ✅ G-XXXX 拿到;GA 账号 404851649(Freeman) 下现有 Big Walk(551679372)/How to Fish(551957323)/phantomblade-0.wiki(550177990) 三资源
- **异常**: GA 下一步按钮位置漂移(视觉估计与实际差130px,放大截图校正520,758);创建按钮两次超出视口(916/850)需滚动
---
### 2026-08-30 13:05:00 | Step 07 | game-seo-onboard
- **入参**: NEXT_PUBLIC_GA_ID=G-DT2TP3JVVE
- **操作**: Vercel POST /v10/projects/how-to-fish/env 创建环境变量(production/preview/development) → 空提交 203a781 触发 redeploy → dpl_9xmDeo8xim2SLeTZaXYunmFGcQ6d READY → 线上验证: 首页 HTML 含 G-DT2TP3JVVE×3 + googletagmanager×2
- **结果**: ✅ GA 数据收集对接完成,线上生效
- **异常**: 无
---
### 技能校验结论汇总(扬哥要求)
1. ❌→✅ 技能假设站点自带 Analytics.tsx——新骨架缺失(GA配了不生效的根因)→已骨架级补齐并部署
2. ⚠️ 技能脚本缺 --host-resolver-rules(DNS污染致GSC打不开)→已修复
3. ⚠️ 输入源 setting.md 参数不全→已回填(Zone ID/项目名/仓库名)
4. ✅ 18个 gsc/ga 自动化脚本存在可用
5. ⚠️ 关代理指令 kill $(pgrep ss-local) 自匹配风险(本日第4次踩坑)→建议修订
6. ✅ GSC/GA 全流程实测通过(网域验证+TXT+sitemap+建资源+数据流+衡量ID)
---
### 2026-08-30 13:20 | favicon/logo 新增（扬哥 GSC 截图反馈驱动）
- **排查**: how-to-fish-v2 public/ 空+layout 无 icons 配置；两代项目+旧部署文件(API)全面搜索确认**无 logo 源文件**（GSC 显示的蓝圈为谷歌默认占位图）
- **操作**: 用站点品牌色生成钓鱼主题 favicon 全套（PIL：渔夫橙 #d96c2b 圆角底 + 白色鱼形剪影，512/192/180/32/16 + 多尺寸 .ico + webmanifest）→ layout.tsx 补 icons/manifest → 提交 a8a8b0c → Vercel READY
- **结果**: ✅ https://www.howtofish2.wiki/favicon.ico = 200 (4640B)，head 标签齐全；视觉校验 16px 可辨认
- **异常**: 扬哥记忆中"hotfish 有 logo"实为谷歌默认占位图——已如实说明
---
