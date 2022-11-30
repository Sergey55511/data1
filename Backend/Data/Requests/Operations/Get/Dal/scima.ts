export const schema = {
    type: 'object',
    properties: {
        storeId: { type: 'integer' },
        stateId: { type: 'integer' },
        managerId: { type: 'integer' },
    },
    required: ['storeId'],
    additionalProperties: false,
};
