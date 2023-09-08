export const schema = {
    type: 'object',
    properties: {
        stateId: {
            type: 'array',
            items: {
                type: 'integer',
            },
        },
        workpieceTypeId: { type: 'integer' },
    },
    additionalProperties: false,
};
