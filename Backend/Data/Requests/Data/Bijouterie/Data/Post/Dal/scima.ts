export const schema = {
    type: 'object',
    properties: {
        bijouterieArticleId: { type: 'number' },
        widthIn: { type: 'number' },
        widthOut: { type: 'number' },
        moneyIn: { type: 'number' },
        moneyOut: { type: 'number' },
        countItemsIn: { type: 'number' },
        countItemsOut: { type: 'number' },
    },
    required: ['bijouterieArticleId'],
    additionalProperties: false,
};
