import { AttributesResource } from 'nodes/Trillium/resources/AttributesResource';

describe('AttributesResource', () => {
  it('should have operation selector for attribute resource', () => {
    const operationProp = AttributesResource.properties.find((p: any) => p.name === 'operation');
    expect(operationProp).toBeDefined();
    expect(operationProp!.displayOptions!.show!.resource).toEqual(['attribute']);
    expect(operationProp!.options).toHaveLength(4);
  });

  it('should have correct parameters for Create operation', () => {
    const type = AttributesResource.properties.find((p: any) => p.name === 'type');
    expect(type).toBeDefined();
    expect(type!.displayOptions!.show!.operation).toEqual(['create']);
    expect(type!.options).toEqual([
      { name: 'Label', value: 'label' },
      { name: 'Relation', value: 'relation' },
    ]);

    const name = AttributesResource.properties.find((p: any) => p.name === 'name');
    expect(name!.required).toBe(true);

    const value = AttributesResource.properties.find((p: any) => p.name === 'value');
    expect(value!.required).toBe(false);
    expect(value!.description).toContain('For labels: the label value');
  });

  it('should have correct parameters for Update operation', () => {
    const attributeId = AttributesResource.properties.find((p: any) => p.name === 'attributeId');
    expect(attributeId).toBeDefined();
    expect(attributeId!.displayOptions!.show!.operation).toContain('update');
    expect(attributeId!.required).toBe(true);

    const isInheritable = AttributesResource.properties.find((p: any) => p.name === 'isInheritable');
    expect(isInheritable!.type).toBe('boolean');
    expect(isInheritable!.default).toBe(false);
  });

  it('should have routing for all operations', () => {
    const operationProp = AttributesResource.properties.find((p: any) => p.name === 'operation');
    const urls = operationProp!.options!.map((option: any) => option.routing!.request.url);
    expect(urls).toContain('=/attributes/{{$parameter.attributeId}}');
    expect(urls).toContain('/attributes');
  });
});