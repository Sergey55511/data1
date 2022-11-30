export const schema = {
    type: 'object',
    properties: {
        storeId: { type: 'integer' },
        operationId: { type: 'number' },
        search: { type: 'string' },
        active: { type: 'boolean' },
    },
    required: ['storeId'],
    additionalProperties: false,
};
