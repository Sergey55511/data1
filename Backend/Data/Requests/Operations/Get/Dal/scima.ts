export const schema = {
    type: 'object',
    properties: {
        storeId: { type: 'integer' },
        stateId: { type: 'integer' },
        managerId: { type: 'integer' },
        managerOperationsActive: { type: 'boolean' },
    },
    required: ['storeId'],
    additionalProperties: false,
};
