import { Trillium } from 'nodes/Trillium/Trillium.node';
import { NotesResource } from 'nodes/Trillium/resources/NotesResource';
import { AttributesResource } from 'nodes/Trillium/resources/AttributesResource';

describe('Trillium Node', () => {
  let node: Trillium;

  beforeEach(() => {
    node = new Trillium({} as any);
  });

  it('should be defined', () => {
    expect(node).toBeDefined();
    expect(node.description.displayName).toBe('Trillium Notes');
    expect(node.description.name).toBe('trillium');
  });

  it('should have correct credentials', () => {
    expect(node.description.credentials).toBeDefined();
    expect(node.description.credentials![0].name).toBe('trilliumApi');
  });

  it('should have correct resources', () => {
    const resourceProperty = node.description.properties.find(p => p.name === 'resource');
    expect(resourceProperty).toBeDefined();
    expect(resourceProperty!.type).toBe('options');
    expect(resourceProperty!.options).toHaveLength(2);
    expect(resourceProperty!.options!.map((o: any) => o.value)).toEqual(['note', 'attribute']);
  });

  it('should include NotesResource properties', () => {
    const operationProp = node.description.properties.find(p => p.name === 'operation');
    expect(operationProp).toBeDefined();
    // Check that NotesResource properties are included
    expect(node.description.properties).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'resource' }),
        ...NotesResource.properties,
        ...AttributesResource.properties,
      ])
    );
  });

  it('should have correct requestDefaults', () => {
    expect(node.description.requestDefaults).toBeDefined();
    expect(node.description.requestDefaults!.baseURL).toBe('={{$credentials.baseUrl}}/etapi');
    expect(node.description.requestDefaults!.headers).toEqual({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
  });

  it('should have correct subtitle', () => {
    expect(node.description.subtitle).toBe('={{ ({get: "Get", create: "Create", update: "Update", updateContent: "Update Content", getContent: "Get Content", delete: "Delete", getChildren: "Get Children", search: "Search", export: "Export"})[$parameter["operation"]] }}');
  });

  it('should have correct inputs and outputs', () => {
    expect(node.description.inputs).toEqual(['main']);
    expect(node.description.outputs).toEqual(['main']);
  });

  it('should have correct icon and group', () => {
    expect(node.description.icon).toBe('file:trillium.svg');
    expect(node.description.group).toEqual(['transform']);
  });
});