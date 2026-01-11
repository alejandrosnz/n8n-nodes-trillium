import { NotesResource } from 'nodes/Trillium/resources/NotesResource';

describe('NotesResource', () => {
  it('should have resource and operation selectors', () => {
    const resourceProp = NotesResource.properties.find((p: any) => p.name === 'resource');
    expect(resourceProp).toBeUndefined(); // It's in the main node

    const operationProp = NotesResource.properties.find((p: any) => p.name === 'operation');
    expect(operationProp).toBeDefined();
    expect(operationProp!.displayOptions!.show!.resource).toEqual(['note']);
    expect(operationProp!.options).toHaveLength(9);
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

  it('should have correct parameters for Update operation', () => {
    const title = NotesResource.properties.find((p: any) => p.name === 'title' && p.displayOptions?.show?.operation?.includes('update'));
    expect(title).toBeDefined();
    expect(title!.required).toBe(false);
    expect(title!.displayOptions!.show!.operation).toEqual(['update']);

    const type = NotesResource.properties.find((p: any) => p.name === 'type' && p.displayOptions?.show?.operation?.includes('update'));
    expect(type!.required).toBe(false);
  });

  it('should have correct parameters for Update Content operation', () => {
    const content = NotesResource.properties.find((p: any) => p.name === 'content' && p.displayOptions?.show?.operation?.includes('updateContent'));
    expect(content).toBeDefined();
    expect(content!.type).toBe('string');
    expect(content!.required).toBe(true);
  });

  it('should have correct parameters for Export operation', () => {
    const format = NotesResource.properties.find((p: any) => p.name === 'format');
    expect(format).toBeDefined();
    expect(format!.type).toBe('options');
    expect(format!.options).toEqual([
      { name: 'HTML', value: 'html' },
      { name: 'Markdown', value: 'markdown' },
    ]);
  });

  it('should have correct parameters for Search operation', () => {
    const search = NotesResource.properties.find((p: any) => p.name === 'search');
    expect(search).toBeDefined();
    expect(search!.displayOptions!.show!.operation).toEqual(['search']);
    expect(search!.required).toBe(true);

    const fastSearch = NotesResource.properties.find((p: any) => p.name === 'fastSearch');
    expect(fastSearch).toBeDefined();
    expect(fastSearch!.type).toBe('boolean');
    expect(fastSearch!.default).toBe(false);

    const includeArchivedNotes = NotesResource.properties.find((p: any) => p.name === 'includeArchivedNotes');
    expect(includeArchivedNotes).toBeDefined();
    expect(includeArchivedNotes!.type).toBe('boolean');

    const ancestorNoteId = NotesResource.properties.find((p: any) => p.name === 'ancestorNoteId');
    expect(ancestorNoteId).toBeDefined();
    expect(ancestorNoteId!.type).toBe('string');

    const orderBy = NotesResource.properties.find((p: any) => p.name === 'orderBy');
    expect(orderBy).toBeDefined();
    expect(orderBy!.type).toBe('string');

    const orderDirection = NotesResource.properties.find((p: any) => p.name === 'orderDirection');
    expect(orderDirection).toBeDefined();
    expect(orderDirection!.type).toBe('options');

    const limit = NotesResource.properties.find((p: any) => p.name === 'limit');
    expect(limit).toBeDefined();
    expect(limit!.type).toBe('number');

    const debug = NotesResource.properties.find((p: any) => p.name === 'debug');
    expect(debug).toBeDefined();
    expect(debug!.type).toBe('boolean');
  });

  it('should have routing for all operations', () => {
    const operationProp = NotesResource.properties.find((p: any) => p.name === 'operation');
    operationProp!.options!.forEach((option: any) => {
      expect(option.routing).toBeDefined();
      expect(option.routing!.request.method).toBeDefined();
      expect(option.routing!.request.url).toBeDefined();
      if (option.routing!.request.qs) {
        expect(option.routing!.request.qs).toBeDefined();
      }
      if (option.routing!.request.headers) {
        expect(option.routing!.request.headers).toBeDefined();
      }
      if (option.routing!.output) {
        expect(option.routing!.output).toBeDefined();
        expect(option.routing!.output!.postReceive).toBeDefined();
      }
      expect(option.routing!.send).toBeUndefined(); // No preSend
    });
  });

  it('should have correct routing for updateContent operation', () => {
    const operationProp = NotesResource.properties.find((p: any) => p.name === 'operation');
    const updateContentOption = operationProp!.options!.find((opt: any) => opt.value === 'updateContent') as any;
    expect(updateContentOption.routing.request.headers).toEqual({ 'Content-Type': 'text/plain' });
  });

  it('should have correct routing for getContent operation', () => {
    const operationProp = NotesResource.properties.find((p: any) => p.name === 'operation');
    const getContentOption = operationProp!.options!.find((opt: any) => opt.value === 'getContent') as any;
    expect(getContentOption.routing.output).toBeDefined();
    expect(getContentOption.routing.output.postReceive).toHaveLength(1);
  });

  it('should have correct routing for search operation', () => {
    const operationProp = NotesResource.properties.find((p: any) => p.name === 'operation');
    const searchOption = operationProp!.options!.find((opt: any) => opt.value === 'search') as any;
    expect(searchOption.routing.request.qs).toEqual({
      search: '={{$parameter.search}}',
      fastSearch: '={{$parameter.fastSearch}}',
      includeArchivedNotes: '={{$parameter.includeArchivedNotes}}',
      ancestorNoteId: '={{$parameter.ancestorNoteId}}',
      orderBy: '={{$parameter.orderBy}}',
      orderDirection: '={{$parameter.orderDirection}}',
      limit: '={{$parameter.limit}}',
      debug: '={{$parameter.debug}}'
    });
  });

  it('should have correct routing for export operation', () => {
    const operationProp = NotesResource.properties.find((p: any) => p.name === 'operation');
    const exportOption = operationProp!.options!.find((opt: any) => opt.value === 'export') as any;
    expect(exportOption.routing.request.qs).toBeDefined();
    expect(exportOption.routing.request.qs.format).toBe('={{$parameter.format}}');
    expect(exportOption.routing.output).toBeDefined();
    expect(exportOption.routing.output.postReceive).toHaveLength(1);
  });

  it('should have correct routing for getChildren operation', () => {
    const operationProp = NotesResource.properties.find((p: any) => p.name === 'operation');
    const getChildrenOption = operationProp!.options!.find((opt: any) => opt.value === 'getChildren') as any;
    expect(getChildrenOption.routing.request.qs).toBeDefined();
    expect(getChildrenOption.routing.request.qs.ancestorNoteId).toBe('={{$parameter.noteId}}');
  });
});