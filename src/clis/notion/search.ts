/**
 * Notion search — search pages and databases
 */
import { cli, Strategy } from '../../registry.js';

cli({
  site: 'notion',
  name: 'search',
  description: 'Search Notion pages and databases',
  domain: 'api.notion.com',
  strategy: Strategy.HEADER,
  args: [
    { name: 'query', type: 'string', required: true, help: 'Search query text' },
    { name: 'limit', type: 'int', default: 10, help: 'Number of results' },
  ],
  columns: ['type', 'title', 'url', 'last_edited'],
  func: async (page, kwargs) => {
    const token = process.env.NOTION_TOKEN;
    if (!token) {
      throw new Error('NOTION_TOKEN environment variable not set');
    }

    const resp = await fetch('https://api.notion.com/v1/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: kwargs.query,
        page_size: kwargs.limit || 10,
      }),
    });

    if (!resp.ok) {
      throw new Error(`Notion API error: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json();
    const results = data.results || [];

    return results.map((item: any) => {
      const props = item.properties || {};
      let title = 'Untitled';
      
      // Try different property names for title
      if (props.title?.title?.[0]?.plain_text) {
        title = props.title.title[0].plain_text;
      } else if (props.Name?.title?.[0]?.plain_text) {
        title = props.Name.title[0].plain_text;
      }

      return {
        type: item.object,
        title,
        url: item.url,
        last_edited: item.last_edited_time?.split('T')[0] || '',
      };
    });
  },
});
