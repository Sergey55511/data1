export const schema = {
    type: 'object',
    properties: {
        storeId: { type: 'integer' },
        pp: { type: 'integer' },
        model: { type: 'string' },
        userId: { type: 'integer' },
        managerId: { type: 'integer' },
        workpieceTypeId: { type: 'integer' },
        colorId: { type: 'integer' },
        length: { type: 'number' },
        gradeId: { type: 'integer' },
        stateId: { type: 'integer' },
        articleId: { type: 'integer' },
        recipientId: { type: 'integer' },
        operationId: { type: 'integer' },
        numDocument: { type: 'string' },
        widthIn: { type: 'number' },
        widthOut: { type: 'number' },
        moneyIn: { type: 'number' },
        moneyOut: { type: 'number' },
        countItemsIn: { type: 'integer' },
        countItemsOut: { type: 'integer' },
        typeAssembleId: { type: 'integer' },
        fullModelId: { type: 'integer' },
    },
    required: [
        'model',
        'userId',
        'workpieceTypeId',
        'colorId',
        'length',
        'gradeId',
        'stateId',
        'articleId',
    ],
    additionalProperties: false,
};
