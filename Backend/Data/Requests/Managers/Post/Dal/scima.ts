export const schema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        storeId: { type: 'integer' },
    },
    required: ['name', 'storeId'],
    additionalProperties: false,
};
