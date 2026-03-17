/**
 * Notion page — get page details
 */
import { cli, Strategy } from '../../registry.js';

cli({
  site: 'notion',
  name: 'page',
  description: 'Get Notion page content',
  domain: 'api.notion.com',
  strategy: Strategy.HEADER,
  args: [
    { name: 'page_id', type: 'string', required: true, help: 'Notion page ID' },
  ],
  columns: ['title', 'url', 'created', 'last_edited', 'archived'],
  func: async (page, kwargs) => {
    const token = process.env.NOTION_TOKEN;
    if (!token) {
      throw new Error('NOTION_TOKEN environment variable not set');
    }

    const resp = await fetch(`https://api.notion.com/v1/pages/${kwargs.page_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
      },
    });

    if (!resp.ok) {
      throw new Error(`Notion API error: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json();
    const props = data.properties || {};
    
    let title = 'Untitled';
    if (props.title?.title?.[0]?.plain_text) {
      title = props.title.title[0].plain_text;
    } else if (props.Name?.title?.[0]?.plain_text) {
      title = props.Name.title[0].plain_text;
    }

    return [{
      title,
      url: data.url,
      created: data.created_time?.split('T')[0] || '',
      last_edited: data.last_edited_time?.split('T')[0] || '',
      archived: data.archived ? 'Yes' : 'No',
    }];
  },
});
