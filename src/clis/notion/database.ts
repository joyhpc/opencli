/**
 * Notion database — query database entries
 */
import { cli, Strategy } from '../../registry.js';

cli({
  site: 'notion',
  name: 'database',
  description: 'Query Notion database',
  domain: 'api.notion.com',
  strategy: Strategy.HEADER,
  args: [
    { name: 'database_id', type: 'string', required: true, help: 'Notion database ID' },
    { name: 'limit', type: 'int', default: 20, help: 'Number of entries' },
  ],
  columns: ['title', 'url', 'created', 'last_edited'],
  func: async (page, kwargs) => {
    const token = process.env.NOTION_TOKEN;
    if (!token) {
      throw new Error('NOTION_TOKEN environment variable not set');
    }

    const resp = await fetch(`https://api.notion.com/v1/databases/${kwargs.database_id}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page_size: kwargs.limit || 20,
      }),
    });

    if (!resp.ok) {
      throw new Error(`Notion API error: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json();
    const results = data.results || [];

    return results.map((item: any) => {
      const props = item.properties || {};
      
      // Find the title property (could be named differently)
      let title = 'Untitled';
      for (const [key, value] of Object.entries(props)) {
        if ((value as any).type === 'title' && (value as any).title?.[0]?.plain_text) {
          title = (value as any).title[0].plain_text;
          break;
        }
      }

      return {
        title,
        url: item.url,
        created: item.created_time?.split('T')[0] || '',
        last_edited: item.last_edited_time?.split('T')[0] || '',
      };
    });
  },
});
