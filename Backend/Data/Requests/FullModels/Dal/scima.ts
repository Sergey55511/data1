export const schema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        workpieceTypeId: { type: 'integer' },
        profileId: { type: 'integer' },
        sizeRangeModelId: { type: 'integer' },
        modelId: { type: 'integer' },
        size: { type: 'integer' },
    },
    additionalProperties: false,
};
