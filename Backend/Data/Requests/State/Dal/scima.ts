export const schema = {
    type: 'object',
    properties: {
        stateId: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
        workpieceTypeId: { type: 'integer' },
    },
    additionalProperties: false,
};
