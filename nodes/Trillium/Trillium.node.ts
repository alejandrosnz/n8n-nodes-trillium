import type {
  INodeType,
  INodeTypeDescription,
  INodeTypeBaseDescription,
} from 'n8n-workflow';

import { NotesResource } from './resources/NotesResource';
import { AttributesResource } from './resources/AttributesResource';

export class Trillium implements INodeType {
  description: INodeTypeDescription;

  constructor(baseDescription: INodeTypeBaseDescription) {
    this.description = {
      ...baseDescription,
      displayName: 'Trillium Notes',
      name: 'trillium',
      icon: 'file:trillium.svg',
      group: ['transform'],
      version: 1,
      subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
      description: 'Interact with Trillium Notes API to manage notes, attributes, and relations (relations via attributes)',
      usableAsTool: true,
      defaults: {
        name: 'Trillium Notes',
      },
      inputs: ['main'],
      outputs: ['main'],
      credentials: [
        {
          name: 'trilliumApi',
          required: true,
        },
      ],
      requestDefaults: {
        baseURL: '={{$credentials.baseUrl}}/etapi',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
      properties: [
        // Resource selector
        {
          displayName: 'Resource',
          name: 'resource',
          type: 'options',
          noDataExpression: true,
          options: [
            { name: 'Note', value: 'note' },
            { name: 'Attribute', value: 'attribute' },
          ],
          default: 'note',
        },
        // Operations for Note
        ...NotesResource.properties,
        // Operations for Attribute
        ...AttributesResource.properties,
      ],
    };
  }
}