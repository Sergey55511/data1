export const schema = {
    type: 'object',
    properties: {
        start: { type: 'string' },
        end: { type: 'string' },
        lot: { type: 'number' },
        pp: { type: 'number' },
        operationId: { type: 'number' },
        numDocument: { type: 'string' },
    },
    required: ['start', 'end'],
    additionalProperties: false,
};
