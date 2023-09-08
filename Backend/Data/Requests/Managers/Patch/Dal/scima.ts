export const schema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        params: { type: 'object', maxProperties: 1 },
    },
    required: ['id'],
    additionalProperties: false,
};
