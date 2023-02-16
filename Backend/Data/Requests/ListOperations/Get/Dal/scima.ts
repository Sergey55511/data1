export const schema = {
    type: 'object',
    properties: {
        start: { type: 'string' },
        end: { type: 'string' },
    },
    required: ['start', 'end'],
    additionalProperties: false,
};
