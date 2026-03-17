# OpenCLI 部署指南（Ubuntu GUI）

适用环境：带桌面（GUI）的 Ubuntu。opencli 会复用你本机的 Google Chrome 登录态，并通过扩展与 Playwright 对接，从而尽量减少验证码干扰。

---

## 部署状态

### ✅ 已完成
1. ✅ Node.js 环境（v24.13.1）
2. ✅ opencli 源码克隆到 `~/.openclaw/workspace/opencli`
3. ✅ 依赖安装和编译（`npm install && npm run build`）
4. ✅ 全局命令注册（`npm link`）
5. ✅ Notion 集成（4个命令：search, page, database, blocks）
6. ✅ Fork 到 GitHub: https://github.com/joyhpc/opencli
7. ✅ 市场调研脚本（`gather_market.sh`）
8. ✅ 部署检查脚本（`check_deployment.sh`）

### ⚠️ 待完成（需要你手动操作）
1. ❌ **安装 Google Chrome**（需要 sudo 密码）
2. ❌ **安装 Chrome 扩展：Playwright MCP Bridge**
3. ❌ **在 Chrome 中登录目标平台**（知乎、小红书、B站等）
4. ❌ **运行 `opencli setup`** 配置 Playwright token
5. ❌ **配置 NOTION_TOKEN 环境变量**

---

## 1. 基础环境准备 ✅

已完成：
- Node.js v24.13.1
- npm 11.8.0
- git, curl, build-essential

---

## 2. 安装并链接 opencli ✅

已完成：
```bash
# 仓库位置
~/.openclaw/workspace/opencli

# 全局命令
which opencli
# /home/hpc/.npm-global/bin/opencli

opencli --version
# 0.7.10
```

---

## 3. 配置 Chrome 浏览器环境 ⚠️

### 3.1 安装 Google Chrome ❌

**需要你手动执行（需要 sudo 密码）：**

```bash
# Chrome 安装包已下载到 /tmp
sudo apt install -y /tmp/google-chrome-stable_current_amd64.deb

# 验证安装
google-chrome --version
```

### 3.2 安装浏览器扩展 ❌

**需要你手动操作：**

1. 打开 Chrome
2. 访问：https://chromewebstore.google.com/detail/playwright-mcp-bridge/mmlmfjhmonkocbjadbfplnigmagldckm
3. 点击"添加至 Chrome"安装扩展

### 3.3 开启开发者模式（可选但推荐）

1. 在 Chrome 地址栏访问 `chrome://extensions/`
2. 开启右上角"开发者模式"

---

## 4. 平台登录（关键）❌

opencli 的核心优势是利用你已登录的浏览器状态来规避验证码。

**需要你手动操作：**

1. 打开 Chrome
2. 手动登录以下平台并确保"记住登录状态"：
   - 知乎（zhihu.com）
   - 小红书（xiaohongshu.com）
   - B站（bilibili.com）
3. 保持 Chrome 不要彻底关闭

---

## 5. 配置 Playwright MCP Bridge ❌

**需要你手动执行：**

```bash
opencli setup
```

这个命令会：
- 🔍 从 Chrome 自动发现 `PLAYWRIGHT_MCP_EXTENSION_TOKEN`
- ☑️ 显示所有支持的工具（Codex、Cursor、Claude Code 等）
- ✏️ 只更新你选中的文件
- 🔌 完成后自动验证浏览器连通性

---

## 6. 配置 NOTION_TOKEN ❌

**需要你手动执行：**

```bash
# 添加到 ~/.bashrc
echo 'export NOTION_TOKEN="ntn_W20522463729fMNRllNHmez9S2hborcKxdkNJhzkgDfc2z"' >> ~/.bashrc

# 立即生效
source ~/.bashrc

# 验证
echo $NOTION_TOKEN
```

---

## 7. 验证安装

### 检查部署状态

```bash
~/.openclaw/workspace/opencli/check_deployment.sh
```

### 测试命令

**测试知乎搜索（需要完成步骤 3-5）：**
```bash
opencli zhihu search --keyword "AI 英语" --limit 2 -f table
```

**测试 Notion 搜索（需要完成步骤 6）：**
```bash
opencli notion search --query "opencli" --limit 5
```

---

## 8. 自动化调研脚本 ✅

已创建脚本：`~/.openclaw/workspace/opencli/gather_market.sh`

**使用方法（需要完成步骤 3-5）：**

```bash
cd ~/.openclaw/workspace/opencli
./gather_market.sh
```

脚本会采集：
- 知乎："初中生 英语 拒绝补习"
- 小红书："孩子 英语口语 愿意开口"
- B站："AI 英语陪练 测评"

结果保存在 `./market_research_data/` 目录。

---

## Notion 命令使用

### 可用命令

```bash
opencli list | grep notion
```

输出：
```
notion
  blocks [header] — Get Notion page blocks (content)
  database [header] — Query Notion database
  page [header] — Get Notion page content
  search [header] — Search Notion pages and databases
```

### 使用示例

```bash
# 搜索页面
opencli notion search --query "opencli" --limit 5

# 获取页面详情
opencli notion page --page_id "32607a52cb6480e5be63db17136d3aa2"

# 获取页面内容
opencli notion blocks --page_id "32607a52cb6480e5be63db17136d3aa2" -f yaml

# 查询数据库
opencli notion database --database_id "your_db_id" --limit 20
```

### 输出格式

所有命令支持多种输出格式：

```bash
-f table   # 默认：富文本表格
-f json    # JSON（适合传给 jq 或 AI Agent）
-f yaml    # YAML（更适合人类阅读）
-f md      # Markdown
-f csv     # CSV
```

---

## 常见问题排查

### 1. "Failed to connect to Playwright MCP Bridge"

- 确保 Chrome 已安装且开启了 Playwright MCP Bridge 扩展
- 如果是刚装完插件，需要重启 Chrome

### 2. 返回空数据或 "Unauthorized"

- Chrome 里的登录态可能已过期
- 打开 Chrome，在新标签页重新登录或刷新页面

### 3. Node API 错误

- 确保 Node.js 版本 >= 18（当前 v24.13.1 ✅）

### 4. NOTION_TOKEN 未设置

```bash
# 检查
echo $NOTION_TOKEN

# 如果为空，重新设置
export NOTION_TOKEN="ntn_W20522463729fMNRllNHmez9S2hborcKxdkNJhzkgDfc2z"
```

### 5. opencli 命令不存在

```bash
# 重新链接
cd ~/.openclaw/workspace/opencli
npm link

# 验证
which opencli
```

---

## 诊断工具

```bash
# 只读 Token 与配置诊断
opencli doctor

# 额外测试浏览器连通性
opencli doctor --live

# 修复不一致的配置（交互确认）
opencli doctor --fix

# 无交互直接修复所有配置
opencli doctor --fix -y
```

---

## 更新 opencli

```bash
cd ~/.openclaw/workspace/opencli
git pull origin main
npm install
npm run build
```

---

## 技术细节

### 仓库信息
- **Fork**: https://github.com/joyhpc/opencli
- **上游**: https://github.com/jackwener/opencli
- **本地路径**: `~/.openclaw/workspace/opencli`

### Notion 集成
- **实现方式**: TypeScript 适配器（`src/clis/notion/*.ts`）
- **认证策略**: HEADER（Bearer Token）
- **API 版本**: Notion API 2022-06-28
- **依赖**: 无需浏览器，直接调用 REST API

### 已添加的 Notion 命令
1. `search.ts` - 搜索页面和数据库
2. `page.ts` - 获取页面元数据
3. `database.ts` - 查询数据库内容
4. `blocks.ts` - 获取页面块内容（文本内容）

---

## 下一步扩展

可以根据需要添加更多 Notion 命令：
- `create-page` - 创建新页面
- `update-page` - 更新页面内容
- `list-databases` - 列出所有数据库
- `create-database` - 创建新数据库

参考现有实现即可快速扩展。

---

**最后更新**: 2026-03-17
