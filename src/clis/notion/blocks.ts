/**
 * Notion blocks — get page block content
 */
import { cli, Strategy } from '../../registry.js';

cli({
  site: 'notion',
  name: 'blocks',
  description: 'Get Notion page blocks (content)',
  domain: 'api.notion.com',
  strategy: Strategy.HEADER,
  args: [
    { name: 'page_id', type: 'string', required: true, help: 'Notion page ID' },
  ],
  columns: ['type', 'content'],
  func: async (page, kwargs) => {
    const token = process.env.NOTION_TOKEN;
    if (!token) {
      throw new Error('NOTION_TOKEN environment variable not set');
    }

    const resp = await fetch(`https://api.notion.com/v1/blocks/${kwargs.page_id}/children`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
      },
    });

    if (!resp.ok) {
      throw new Error(`Notion API error: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json();
    const blocks = data.results || [];

    return blocks.map((block: any) => {
      const type = block.type;
      let content = '';

      // Extract text content based on block type
      if (block[type]?.rich_text) {
        content = block[type].rich_text.map((t: any) => t.plain_text).join('');
      } else if (block[type]?.title) {
        content = block[type].title;
      } else if (block[type]?.url) {
        content = block[type].url;
      }

      return {
        type,
        content: content || JSON.stringify(block[type]),
      };
    });
  },
});
