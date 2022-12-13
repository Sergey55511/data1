export const schema = {
    type: 'object',
    properties: {
        workpieceTypeId: { type: 'integer' },
        profileId: { type: 'integer' },
        size: { type: 'integer' },
    },
    required: ['workpieceTypeId', 'profileId', 'size'],
    additionalProperties: false,
};
