export const schema = {
    type: 'object',
    properties: {
        idAccessory: { type: 'number' },
        countIn: { type: 'number' },
        countOut: { type: 'number' },
        moneyIn: { type: 'number' },
        moneyOut: { type: 'number' },
        pp: { type: 'number' },
    },
    required: ['idAccessory'],
    additionalProperties: false,
};
