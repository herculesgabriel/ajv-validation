import Ajv from 'ajv'

const Character = {
  type: 'object',
  properties: {
    real_name: { type: 'string' },
    nickname: { type: 'string' },
    description: { type: 'string' }
  },
  required: ['real_name', 'nickname'],
  additionalProperties: false
}

const ajv = new Ajv({ allErrors: true })

export const characterValidation = ajv.compile(Character)
