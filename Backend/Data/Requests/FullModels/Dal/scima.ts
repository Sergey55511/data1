export const schema = {
    type: 'object',
    properties: {
        workpieceTypeId: { type: 'integer' },
        profileId: { type: 'integer' },
        sizeRangeModelId: { type: 'integer' },
    },
    required: ['workpieceTypeId', 'profileId', 'sizeRangeModelId'],
    additionalProperties: false,
};
