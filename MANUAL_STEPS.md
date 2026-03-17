# OpenCLI 手动操作指南

## 需要你在 GUI 中完成的 3 个步骤

### 步骤 1：安装 Playwright MCP Bridge 扩展

1. **打开 Chrome 浏览器**
   - 在桌面或应用菜单中找到 Google Chrome
   - 点击打开

2. **访问扩展页面**
   - 复制这个链接：
     ```
     https://chromewebstore.google.com/detail/playwright-mcp-bridge/mmlmfjhmonkocbjadbfplnigmagldckm
     ```
   - 粘贴到 Chrome 地址栏，按回车

3. **安装扩展**
   - 点击页面上的"添加至 Chrome"按钮
   - 在弹出的确认对话框中点击"添加扩展程序"
   - 等待安装完成（右上角会出现扩展图标）

4. **开启开发者模式（可选但推荐）**
   - 在地址栏输入：`chrome://extensions/`
   - 找到右上角的"开发者模式"开关
   - 打开它

---

### 步骤 2：登录目标平台

在 Chrome 中依次登录以下网站，并确保勾选"记住我"或"保持登录状态"：

#### 2.1 知乎
1. 访问：https://www.zhihu.com
2. 点击右上角"登录"
3. 输入账号密码
4. 勾选"记住我"
5. 登录成功后，保持标签页打开

#### 2.2 小红书
1. 访问：https://www.xiaohongshu.com
2. 点击"登录"
3. 输入账号密码或扫码登录
4. 确保登录状态保持
5. 保持标签页打开

#### 2.3 B站
1. 访问：https://www.bilibili.com
2. 点击右上角"登录"
3. 输入账号密码或扫码登录
4. 勾选"自动登录"
5. 保持标签页打开

**重要提示：**
- 登录后不要关闭 Chrome
- 不要清除浏览器 Cookie
- 如果遇到验证码，完成验证即可

---

### 步骤 3：配置 Playwright MCP Bridge

1. **打开终端**
   - 按 `Ctrl + Alt + T` 打开终端

2. **运行配置命令**
   ```bash
   cd ~/.openclaw/workspace/opencli
   opencli setup
   ```

3. **按照提示操作**
   - 工具会自动从 Chrome 扩展中发现 Token
   - 选择需要配置的工具（用空格选择，回车确认）
   - 等待配置完成

4. **验证连通性**
   ```bash
   opencli doctor --live
   ```

---

## 完成后测试

### 测试 Notion（已经可用）
```bash
opencli notion search --query "test" --limit 5
```

### 测试知乎
```bash
opencli zhihu search --keyword "AI" --limit 2 -f table
```

### 测试小红书
```bash
opencli xiaohongshu search --keyword "英语学习" --limit 3 -f table
```

### 测试 B站
```bash
opencli bilibili search --keyword "AI教程" --limit 3 -f table
```

### 运行市场调研脚本
```bash
cd ~/.openclaw/workspace/opencli
./gather_market.sh
```

---

## 常见问题

### Q1: 扩展安装后找不到图标？
A: 点击 Chrome 右上角的拼图图标（扩展管理），找到 Playwright MCP Bridge，点击图钉固定到工具栏。

### Q2: opencli setup 找不到 Token？
A: 
1. 确保扩展已安装并启用
2. 重启 Chrome 浏览器
3. 再次运行 `opencli setup`

### Q3: 登录后还是提示未授权？
A: 
1. 检查 Chrome 是否还在运行
2. 确认登录状态没有过期
3. 尝试刷新页面重新登录

### Q4: 验证码太频繁？
A: 这正是 opencli 的优势所在 - 它复用你的浏览器登录态，大大减少验证码。确保：
- Chrome 保持打开
- 登录状态有效
- 不要频繁切换 IP

---

## 快速检查清单

完成后，运行检查脚本：
```bash
NOTION_TOKEN="ntn_W20522463729fMNRllNHmez9S2hborcKxdkNJhzkgDfc2z" ~/.openclaw/workspace/opencli/check_deployment.sh
```

应该看到：
- ✓ Node.js 版本
- ✓ opencli 安装
- ✓ Notion 命令
- ✓ NOTION_TOKEN
- ✓ Chrome 浏览器
- ✓ Playwright MCP Bridge（完成步骤 3 后）

---

**预计完成时间：5-10 分钟**

如果遇到问题，随时告诉我！
