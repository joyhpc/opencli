#!/bin/bash
# 市场调研数据采集脚本

mkdir -p ./market_research_data

echo "开始市场调研采集..."

# 知乎搜索
echo "采集知乎数据..."
opencli zhihu search --keyword "初中生 英语 拒绝补习" --limit 5 -f json > ./market_research_data/A_zhihu.json

# 小红书搜索
echo "采集小红书数据..."
opencli xiaohongshu search --keyword "孩子 英语口语 愿意开口" --limit 5 -f json > ./market_research_data/A_xhs.json

# B站搜索
echo "采集B站数据..."
opencli bilibili search --keyword "AI 英语陪练 测评" --limit 5 -f json > ./market_research_data/C_bilibili.json

echo "采集完成！结果保存在 ./market_research_data 目录下。"
echo ""
echo "查看结果："
echo "  ls -lh ./market_research_data/"
echo "  cat ./market_research_data/A_zhihu.json | jq ."
