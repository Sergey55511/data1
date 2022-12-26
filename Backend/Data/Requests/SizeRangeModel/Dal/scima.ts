export const schema = {
    type: 'object',
    properties: {
        workpieceTypeId: { type: 'integer' },
        profileId: { type: 'integer' },
        size: { type: 'integer' },
        modelId: { type: 'integer' },
    },
    required: ['workpieceTypeId'],
    additionalProperties: false,
};
