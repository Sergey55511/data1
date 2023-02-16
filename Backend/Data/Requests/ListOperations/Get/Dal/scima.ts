export const schema = {
    type: 'object',
    properties: {
        month: { type: 'integer' },
        year: { type: 'integer' },
    },
    required: ['month', 'year'],
    additionalProperties: false,
};
