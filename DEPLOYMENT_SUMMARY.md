# OpenCLI 部署总结

## 已完成的工作 ✅

### 1. 基础部署
- ✅ 克隆 opencli 仓库到 `~/.openclaw/workspace/opencli`
- ✅ 安装依赖并编译（`npm install && npm run build`）
- ✅ 全局命令注册（`npm link`）
- ✅ Fork 到你的 GitHub: https://github.com/joyhpc/opencli

### 2. Notion 集成
添加了 4 个 Notion 命令：
- ✅ `search` - 搜索页面和数据库
- ✅ `page` - 获取页面元数据
- ✅ `database` - 查询数据库内容
- ✅ `blocks` - 获取页面块内容（可以读取 Notion 页面文本）

### 3. 工具脚本
- ✅ `check_deployment.sh` - 部署状态检查脚本
- ✅ `gather_market.sh` - 市场调研数据采集脚本

### 4. 文档
- ✅ `NOTION_SETUP.md` - 完整的部署和使用指南

---

## 需要你手动完成的步骤 ⚠️

### 1. 安装 Google Chrome（需要 sudo 密码）

```bash
sudo apt install -y /tmp/google-chrome-stable_current_amd64.deb
google-chrome --version
```

### 2. 安装 Chrome 扩展

1. 打开 Chrome
2. 访问：https://chromewebstore.google.com/detail/playwright-mcp-bridge/mmlmfjhmonkocbjadbfplnigmagldckm
3. 安装 Playwright MCP Bridge 扩展

### 3. 登录目标平台

在 Chrome 中登录：
- 知乎（zhihu.com）
- 小红书（xiaohongshu.com）
- B站（bilibili.com）

### 4. 配置 Playwright token

```bash
opencli setup
```

### 5. 配置 NOTION_TOKEN

```bash
echo 'export NOTION_TOKEN="ntn_W20522463729fMNRllNHmez9S2hborcKxdkNJhzkgDfc2z"' >> ~/.bashrc
source ~/.bashrc
```

---

## 验证部署

### 检查状态
```bash
~/.openclaw/workspace/opencli/check_deployment.sh
```

### 测试 Notion（可以立即测试）
```bash
export NOTION_TOKEN="ntn_W20522463729fMNRllNHmez9S2hborcKxdkNJhzkgDfc2z"
opencli notion search --query "opencli" --limit 5
```

### 测试知乎（需要完成步骤 1-4）
```bash
opencli zhihu search --keyword "AI" --limit 2 -f table
```

### 运行市场调研（需要完成步骤 1-4）
```bash
cd ~/.openclaw/workspace/opencli
./gather_market.sh
```

---

## 快速参考

### 查看所有命令
```bash
opencli list
opencli list | grep notion
```

### Notion 命令示例
```bash
# 搜索
opencli notion search --query "test" --limit 5 -f json

# 获取页面
opencli notion page --page_id "32607a52cb6480e5be63db17136d3aa2"

# 读取页面内容
opencli notion blocks --page_id "32607a52cb6480e5be63db17136d3aa2" -f yaml

# 查询数据库
opencli notion database --database_id "xxx" --limit 20
```

### 输出格式
```bash
-f table   # 表格（默认）
-f json    # JSON
-f yaml    # YAML
-f md      # Markdown
-f csv     # CSV
```

---

## 文件位置

- **仓库**: `~/.openclaw/workspace/opencli`
- **GitHub**: https://github.com/joyhpc/opencli
- **文档**: `~/.openclaw/workspace/opencli/NOTION_SETUP.md`
- **检查脚本**: `~/.openclaw/workspace/opencli/check_deployment.sh`
- **调研脚本**: `~/.openclaw/workspace/opencli/gather_market.sh`

---

## 下一步

1. 完成上面 5 个手动步骤
2. 运行检查脚本验证部署
3. 测试 Notion 命令
4. 测试市场调研脚本

完整文档见：`~/.openclaw/workspace/opencli/NOTION_SETUP.md`
