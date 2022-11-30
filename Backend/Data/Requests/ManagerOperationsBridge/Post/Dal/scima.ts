export const schema = {
    type: 'object',
    properties: {
        managerId: { type: 'integer' },
        operationId: { type: 'integer' },
    },
    required: ['managerId', 'operationId'],
    additionalProperties: false,
};
