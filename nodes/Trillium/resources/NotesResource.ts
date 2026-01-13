import type { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  // Operation selector for Note
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['note'] },
    },
    options: [
      { name: 'Get', value: 'get', routing: { request: { method: 'GET', url: '=/notes/{{$parameter.noteId}}' } } },
      { name: 'Create', value: 'create', routing: { request: { method: 'POST', url: '/create-note', body: { parentNoteId: '={{$parameter.parentNoteId}}', title: '={{$parameter.title}}', type: '={{$parameter.type}}', mime: '={{$parameter.mime}}', content: '={{$parameter.content}}' } } } },
      { name: 'Update', value: 'update', routing: { request: { method: 'PATCH', url: '=/notes/{{$parameter.noteId}}' } } },
      { name: 'Update Content', value: 'updateContent', routing: { request: { method: 'PUT', url: '=/notes/{{$parameter.noteId}}/content', headers: { 'Content-Type': 'text/plain' } } } },
      { name: 'Get Content', value: 'getContent', routing: { request: { method: 'GET', url: '=/notes/{{$parameter.noteId}}/content' }, output: { postReceive: [async (items, response) => [{ json: { content: response.body as string } }]] } } },
      { name: 'Delete', value: 'delete', routing: { request: { method: 'DELETE', url: '=/notes/{{$parameter.noteId}}' } } },
      { name: 'Get Children', value: 'getChildren', routing: { request: { method: 'GET', url: '/notes', qs: { ancestorNoteId: '={{$parameter.noteId}}' } } } },
      { name: 'Search', value: 'search', routing: { request: { method: 'GET', url: '/notes', qs: { search: '={{$parameter.search}}', fastSearch: '={{$parameter.fastSearch}}', includeArchivedNotes: '={{$parameter.includeArchivedNotes}}', ancestorNoteId: '={{$parameter.ancestorNoteId}}', orderBy: '={{$parameter.orderBy}}', orderDirection: '={{$parameter.orderDirection}}', limit: '={{$parameter.limit}}', debug: '={{$parameter.debug}}' } } } },
      { name: 'Export', value: 'export', routing: { request: { method: 'GET', url: '=/notes/{{$parameter.noteId}}/export', qs: { format: '={{$parameter.format}}' } }, output: { postReceive: [async (items, response) => [{ json: {}, binary: { 'data': { data: (response.body as Buffer).toString('base64'), mimeType: 'application/zip', fileName: 'note-export.zip' } } }]] } } },
    ],
    default: 'get',
  },
  // Parameters for Get
  {
    displayName: 'Note ID',
    name: 'noteId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        operation: ['get', 'update', 'updateContent', 'getContent', 'delete', 'getChildren', 'export'],
        resource: ['note'],
      },
    },
    default: '',
    description: 'The ID of the note to retrieve, update, delete, or get children for.',
  },
  // Parameters for Create
  {
    displayName: 'Parent Note ID',
    name: 'parentNoteId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        operation: ['create'],
        resource: ['note'],
      },
    },
    default: '',
    description: 'The ID of the parent note where this new note will be placed in the tree.',
  },
  {
    displayName: 'Title',
    name: 'title',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        operation: ['create'],
        resource: ['note'],
      },
    },
    default: '',
    description: 'The title of the new note.',
  },
  {
    displayName: 'Type',
    name: 'type',
    type: 'options',
    required: true,
    displayOptions: {
      show: {
        operation: ['create'],
        resource: ['note'],
      },
    },
    options: [
      { name: 'Text', value: 'text' },
      { name: 'Code', value: 'code' },
      { name: 'Render', value: 'render' },
      { name: 'File', value: 'file' },
      { name: 'Image', value: 'image' },
      { name: 'Search', value: 'search' },
      { name: 'Relation Map', value: 'relationMap' },
      { name: 'Book', value: 'book' },
    ],
    default: 'text',
    description: 'The type of the new note.',
  },
  {
    displayName: 'Content',
    name: 'content',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        operation: ['create'],
        resource: ['note'],
      },
    },
    default: '',
    description: 'The initial content of the note (HTML for text types, code for code types).',
  },
  {
    displayName: 'MIME Type',
    name: 'mime',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        operation: ['create'],
        resource: ['note'],
      },
    },
    default: 'text/html',
    description: 'MIME type (e.g., text/html for text, application/javascript for code)',
  },
  // Parameters for Update
  {
    displayName: 'Title',
    name: 'title',
    type: 'string',
    required: false,
    displayOptions: {
      show: {
        operation: ['update'],
        resource: ['note'],
      },
    },
    default: '',
    description: 'New title for the note. Leave empty to keep the current title.',
  },
  {
    displayName: 'Type',
    name: 'type',
    type: 'string',
    required: false,
    displayOptions: {
      show: {
        operation: ['update'],
        resource: ['note'],
      },
    },
    default: '',
    description: 'New type for the note. Leave empty to keep the current type.',
  },
  {
    displayName: 'MIME Type',
    name: 'mime',
    type: 'string',
    required: false,
    displayOptions: {
      show: {
        operation: ['update'],
        resource: ['note'],
      },
    },
    default: '',
    description: 'New MIME type for the note. Leave empty to keep the current MIME type.',
  },
  // Parameters for Update Content
  {
    displayName: 'Content',
    name: 'content',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        operation: ['updateContent'],
        resource: ['note'],
      },
    },
    default: '',
    description: 'The new HTML content for the note.',
  },
  // Parameters for Search
  {
    displayName: 'Search Query',
    name: 'search',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        operation: ['search'],
        resource: ['note'],
      },
    },
    default: '',
    description: 'Search query using Trillium search syntax (e.g., #todo #!done)',
  },
  {
    displayName: 'Fast Search',
    name: 'fastSearch',
    type: 'boolean',
    required: false,
    displayOptions: {
      show: {
        operation: ['search'],
        resource: ['note'],
      },
    },
    default: false,
  },
  {
    displayName: 'Include Archived Notes',
    name: 'includeArchivedNotes',
    type: 'boolean',
    required: false,
    displayOptions: {
      show: {
        operation: ['search'],
        resource: ['note'],
      },
    },
    default: false,
  },
  {
    displayName: 'Ancestor Note ID',
    name: 'ancestorNoteId',
    type: 'string',
    required: false,
    displayOptions: {
      show: {
        operation: ['search'],
        resource: ['note'],
      },
    },
    default: '',
    description: 'Limit search to descendants of this note',
  },
  {
    displayName: 'Order By',
    name: 'orderBy',
    type: 'string',
    required: false,
    displayOptions: {
      show: {
        operation: ['search'],
        resource: ['note'],
      },
    },
    default: '',
  },
  {
    displayName: 'Order Direction',
    name: 'orderDirection',
    type: 'options',
    required: false,
    displayOptions: {
      show: {
        operation: ['search'],
        resource: ['note'],
      },
    },
    options: [
      { name: 'Ascending', value: 'asc' },
      { name: 'Descending', value: 'desc' },
    ],
    default: 'asc',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    required: false,
    displayOptions: {
      show: {
        operation: ['search'],
        resource: ['note'],
      },
    },
    default: '',
  },
  {
    displayName: 'Debug',
    name: 'debug',
    type: 'boolean',
    required: false,
    displayOptions: {
      show: {
        operation: ['search'],
        resource: ['note'],
      },
    },
    default: false,
  },
  // Parameters for Export
  {
    displayName: 'Format',
    name: 'format',
    type: 'options',
    required: false,
    displayOptions: {
      show: {
        operation: ['export'],
        resource: ['note'],
      },
    },
    options: [
      { name: 'HTML', value: 'html' },
      { name: 'Markdown', value: 'markdown' },
    ],
    default: 'html',
    description: 'The format of the exported notes.',
  },
];

export const NotesResource = {
  properties,
};