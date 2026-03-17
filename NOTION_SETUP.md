# OpenCLI Notion 集成

## 部署完成 ✅

已成功部署 opencli 并添加 Notion 支持。

### 安装位置
- 仓库：`~/.openclaw/workspace/opencli`
- Fork：https://github.com/joyhpc/opencli
- 全局命令：`opencli`（已通过 npm link 安装）

### Notion 命令

已添加 3 个 Notion 命令：

1. **search** - 搜索 Notion 页面和数据库
2. **page** - 获取页面详情
3. **database** - 查询数据库内容

### 使用方法

#### 1. 设置环境变量

```bash
export NOTION_TOKEN="ntn_W20522463729fMNRllNHmez9S2hborcKxdkNJhzkgDfc2z"
```

或者在命令前临时设置：

```bash
NOTION_TOKEN="your_token" opencli notion search --query "test"
```

#### 2. 搜索 Notion 内容

```bash
opencli notion search --query "opencli" --limit 5
```

输出格式选项：
```bash
opencli notion search --query "test" -f json   # JSON 格式
opencli notion search --query "test" -f yaml   # YAML 格式
opencli notion search --query "test" -f md     # Markdown 格式
```

#### 3. 获取页面详情

```bash
opencli notion page --page_id "32607a52cb6480e5be63db17136d3aa2"
```

#### 4. 查询数据库

```bash
opencli notion database --database_id "your_database_id" --limit 20
```

### 验证测试

已测试搜索功能，成功返回结果：

```
notion/search
┌──────┬──────────────┬────────────────────────────────────────────────────────────────┬─────────────┐
│ Type │ Title        │ Url                                                            │ Last_edited │
├──────┼──────────────┼────────────────────────────────────────────────────────────────┼─────────────┤
│ page │ opencli 部署 │ https://www.notion.so/opencli-32607a52cb6480e5be63db17136d3aa2 │ 2026-03-17  │
└──────┴──────────────┴────────────────────────────────────────────────────────────────┴─────────────┘
```

### 永久配置

将 NOTION_TOKEN 添加到 `~/.bashrc`：

```bash
echo 'export NOTION_TOKEN="ntn_W20522463729fMNRllNHmez9S2hborcKxdkNJhzkgDfc2z"' >> ~/.bashrc
source ~/.bashrc
```

### 查看所有命令

```bash
opencli list                    # 查看所有可用命令
opencli list | grep notion      # 只看 Notion 命令
```

### 更新

如果需要更新 opencli：

```bash
cd ~/.openclaw/workspace/opencli
git pull upstream main          # 从上游拉取更新
npm run build                   # 重新构建
```

### 技术细节

- **实现方式**：TypeScript 适配器（`src/clis/notion/*.ts`）
- **认证策略**：HEADER（使用 Bearer Token）
- **API 版本**：Notion API 2022-06-28
- **依赖**：无需浏览器，直接调用 Notion REST API

### 下一步

可以根据需要添加更多 Notion 命令：
- `create-page` - 创建新页面
- `update-page` - 更新页面内容
- `list-databases` - 列出所有数据库
- `create-database` - 创建新数据库

参考现有实现即可快速扩展。
