export const schema = {
    type: 'object',
    properties: {
        userId: { type: 'integer' },
        recipientId: { type: 'integer' },
        numDocument: { type: 'string' },
        articles: {
            type: 'array',
            items: {
                type: 'integer',
                minItems: 1,
            },
        },
    },
    required: ['userId', 'recipientId', 'numDocument', 'articles'],
    additionalProperties: false,
};
