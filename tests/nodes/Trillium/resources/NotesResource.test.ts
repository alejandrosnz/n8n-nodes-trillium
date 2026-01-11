import { NotesResource } from 'nodes/Trillium/resources/NotesResource';

describe('NotesResource', () => {
  it('should have resource and operation selectors', () => {
    const resourceProp = NotesResource.properties.find((p: any) => p.name === 'resource');
    expect(resourceProp).toBeUndefined(); // It's in the main node

    const operationProp = NotesResource.properties.find((p: any) => p.name === 'operation');
    expect(operationProp).toBeDefined();
    expect(operationProp!.displayOptions!.show!.resource).toEqual(['note']);
    expect(operationProp!.options).toHaveLength(8);
  });

  it('should have correct parameters for Get operation', () => {
    const noteIdParam = NotesResource.properties.find((p: any) => p.name === 'noteId');
    expect(noteIdParam).toBeDefined();
    expect(noteIdParam!.displayOptions!.show!.operation).toContain('get');
    expect(noteIdParam!.required).toBe(true);
  });

  it('should have correct parameters for Create operation', () => {
    const parentNoteId = NotesResource.properties.find((p: any) => p.name === 'parentNoteId');
    expect(parentNoteId).toBeDefined();
    expect(parentNoteId!.displayOptions!.show!.operation).toEqual(['create']);
    expect(parentNoteId!.required).toBe(true);

    const title = NotesResource.properties.find((p: any) => p.name === 'title');
    expect(title!.displayOptions!.show!.operation).toEqual(['create']);
    expect(title!.required).toBe(true);

    const type = NotesResource.properties.find((p: any) => p.name === 'type');
    expect(type!.options).toHaveLength(8);
  });

  it('should have correct parameters for Search operation', () => {
    const search = NotesResource.properties.find((p: any) => p.name === 'search');
    expect(search!.displayOptions!.show!.operation).toEqual(['search']);
    expect(search!.required).toBe(true);

    const fastSearch = NotesResource.properties.find((p: any) => p.name === 'fastSearch');
    expect(fastSearch!.type).toBe('boolean');
    expect(fastSearch!.default).toBe(false);
  });

  it('should have routing for all operations', () => {
    const operationProp = NotesResource.properties.find((p: any) => p.name === 'operation');
    operationProp!.options!.forEach((option: any) => {
      expect(option.routing).toBeDefined();
      expect(option.routing!.request.method).toBeDefined();
      expect(option.routing!.request.url).toBeDefined();
      expect(option.routing!.send).toBeUndefined(); // No preSend
    });
  });
});