#!/bin/bash
# opencli 部署状态检查

echo "=== opencli 部署状态检查 ==="
echo ""

echo "✓ Node.js 版本:"
node -v

echo ""
echo "✓ npm 版本:"
npm -v

echo ""
echo "✓ opencli 安装:"
which opencli
opencli --version 2>/dev/null || echo "opencli 已安装但版本信息不可用"

echo ""
echo "✓ opencli 仓库位置:"
ls -d ~/.openclaw/workspace/opencli 2>/dev/null && echo "~/.openclaw/workspace/opencli" || echo "未找到"

echo ""
echo "✓ Notion 命令:"
opencli list | grep -A 5 "notion" || echo "Notion 命令未找到"

echo ""
echo "✓ NOTION_TOKEN 环境变量:"
if [ -n "$NOTION_TOKEN" ]; then
    echo "已设置 (${NOTION_TOKEN:0:10}...)"
else
    echo "❌ 未设置"
fi

echo ""
echo "✓ Chrome 浏览器:"
if command -v google-chrome &> /dev/null; then
    google-chrome --version
elif command -v chromium-browser &> /dev/null; then
    chromium-browser --version
elif command -v chromium &> /dev/null; then
    chromium --version
else
    echo "❌ 未安装 Chrome/Chromium"
fi

echo ""
echo "=== 待完成项 ==="
echo ""

# 检查 Chrome
if ! command -v google-chrome &> /dev/null && ! command -v chromium-browser &> /dev/null; then
    echo "❌ 需要安装 Google Chrome"
    echo "   命令: sudo apt install -y /tmp/google-chrome-stable_current_amd64.deb"
    echo "   (需要 sudo 密码)"
fi

# 检查 Playwright MCP Bridge
echo "⚠️  需要手动安装 Chrome 扩展: Playwright MCP Bridge"
echo "   链接: https://chromewebstore.google.com/detail/playwright-mcp-bridge/mmlmfjhmonkocbjadbfplnigmagldckm"

# 检查平台登录
echo "⚠️  需要在 Chrome 中登录目标平台（知乎、小红书、B站等）"

# 检查 opencli setup
echo "⚠️  需要运行: opencli setup"
echo "   用于配置 Playwright MCP Bridge token"

echo ""
echo "=== 测试命令 ==="
echo "完成上述步骤后，可以测试："
echo "  opencli zhihu search --keyword 'AI' --limit 2 -f table"
echo "  NOTION_TOKEN='your_token' opencli notion search --query 'test' --limit 5"
