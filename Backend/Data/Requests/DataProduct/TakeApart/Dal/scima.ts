export const schema = {
    type: 'object',
    properties: {
        managerId: { type: 'integer' },
        articles: {
            type: 'array',
            items: {
                type: 'integer',
                minItems: 1,
            },
        },
    },
    required: ['managerId', 'articles'],
    additionalProperties: false,
};
