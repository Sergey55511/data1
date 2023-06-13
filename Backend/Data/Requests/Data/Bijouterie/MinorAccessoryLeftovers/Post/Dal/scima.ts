export const schema = {
    type: 'object',
    properties: {
        idAccessory: { type: 'number' },
        countIn: { type: 'number' },
        countOut: { type: 'number' },
        pp: { type: 'number' },
    },
    required: ['idAccessory'],
    additionalProperties: false,
};
