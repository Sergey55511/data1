const dataSchema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        date: { type: 'string' },
        lot: { type: 'number' },
        numDocument: { type: 'string' },
        pp: { type: 'integer' },
        sizeRangeId: { type: 'integer' },
        widthInDocument: { type: 'number' },
        widthIn: { type: 'number' },
        widthOut: { type: 'number' },
        tareWidth: { type: 'number' },
        provider: { type: 'string' },
        countItemsIn: { type: 'integer' },
        countItemsOut: { type: 'integer' },
        workingHours: { type: 'integer' },
        exercise: { type: 'string' },
        numMoving: { type: 'integer' },
        moneyIn: { type: 'number' },
        moneyOut: { type: 'number' },
        moneyDefect: { type: 'number' },
        typeOfProcessing: { type: 'string' },
        stock: { type: 'string' },
        shade: { type: 'string' },
        materialGroupId: { type: 'integer' },
        workpieceTypeId: { type: 'integer' },
        operationId: { type: 'integer' },
        userId: { type: 'integer' },
        managerId: { type: 'integer' },
        storeId: { type: 'integer' },
        gradeId: { type: 'integer' },
        productionId: { type: 'integer' },
        modelId: { type: 'integer' },
        colorId: { type: 'integer' },
        lengthId: { type: 'integer' },
        stateId: { type: 'integer' },
        channelId: { type: 'integer' },
        fractionId: { type: 'integer' },
        typeId: { type: 'integer' },
        recipientId: { type: 'integer' },
        fullModelId: { type: 'integer' },
        task: { type: 'integer' },
    },
    additionalProperties: false,
};

export const schema = {
    type: 'array',
    items: dataSchema,
};