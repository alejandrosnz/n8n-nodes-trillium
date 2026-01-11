import type { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  // Operation selector for Attribute
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['attribute'] },
    },
    options: [
      { name: 'Get', value: 'get', routing: { request: { method: 'GET', url: '=/attributes/{{$parameter.attributeId}}' } } },
      { name: 'Create', value: 'create', routing: { request: { method: 'POST', url: '/attributes' } } },
      { name: 'Update', value: 'update', routing: { request: { method: 'PATCH', url: '=/attributes/{{$parameter.attributeId}}' } } },
      { name: 'Delete', value: 'delete', routing: { request: { method: 'DELETE', url: '=/attributes/{{$parameter.attributeId}}' } } },
    ],
    default: 'get',
  },
  // Parameters for Get
  {
    displayName: 'Attribute ID',
    name: 'attributeId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        operation: ['get', 'update', 'delete'],
        resource: ['attribute'],
      },
    },
    default: '',
    description: 'The ID of the attribute to retrieve, update, or delete.',
  },
  // Parameters for Create
  {
    displayName: 'Note ID',
    name: 'noteId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        operation: ['create'],
        resource: ['attribute'],
      },
    },
    default: '',
    description: 'The ID of the note to which the attribute will be attached.',
  },
  // Parameters for Create
  {
    displayName: 'Type',
    name: 'type',
    type: 'options',
    required: true,
    displayOptions: {
      show: {
        operation: ['create'],
        resource: ['attribute'],
      },
    },
    options: [
      { name: 'Label', value: 'label' },
      { name: 'Relation', value: 'relation' },
    ],
    default: 'label',
    description: 'The type of the attribute: label or relation.',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        operation: ['create'],
        resource: ['attribute'],
      },
    },
    default: '',
    description: 'The name of the attribute (e.g., #todo, ~relatedNote).',
  },
  {
    displayName: 'Value',
    name: 'value',
    type: 'string',
    required: false,
    displayOptions: {
      show: {
        operation: ['create'],
        resource: ['attribute'],
      },
    },
    default: '',
    description: 'For labels: the label value. For relations: the target note ID.',
  },
  {
    displayName: 'Is Inheritable',
    name: 'isInheritable',
    type: 'boolean',
    required: false,
    displayOptions: {
      show: {
        operation: ['create'],
        resource: ['attribute'],
      },
    },
    default: false,
    description: 'Whether the attribute is inherited by child notes.',
  },
  {
    displayName: 'Position',
    name: 'position',
    type: 'number',
    required: false,
    displayOptions: {
      show: {
        operation: ['create'],
        resource: ['attribute'],
      },
    },
    default: '',
    description: 'The position of the attribute in the list.',
  },
  // Parameters for Update
  {
    displayName: 'Attribute ID',
    name: 'attributeId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        operation: ['update', 'delete'],
        resource: ['attribute'],
      },
    },
    default: '',
  },
  {
    displayName: 'Value',
    name: 'value',
    type: 'string',
    required: false,
    displayOptions: {
      show: {
        operation: ['update'],
        resource: ['attribute'],
      },
    },
    default: '',
    description: 'New value for the attribute. For relations, this is the target note ID.',
  },
  {
    displayName: 'Is Inheritable',
    name: 'isInheritable',
    type: 'boolean',
    required: false,
    displayOptions: {
      show: {
        operation: ['update'],
        resource: ['attribute'],
      },
    },
    default: false,
    description: 'Whether the attribute is inherited by child notes.',
  },
  {
    displayName: 'Position',
    name: 'position',
    type: 'number',
    required: false,
    displayOptions: {
      show: {
        operation: ['update'],
        resource: ['attribute'],
      },
    },
    default: '',
    description: 'The new position of the attribute in the list.',
  },
];

export const AttributesResource = {
  properties,
};