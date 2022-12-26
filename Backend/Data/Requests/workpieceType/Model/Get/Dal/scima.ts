export const schema = {
    type: 'object',
    properties: {
        operationId: { type: 'integer' },
        isminaletgroup: { type: 'boolean' },
    },
    required: ['operationId'],
    additionalProperties: false,
};
