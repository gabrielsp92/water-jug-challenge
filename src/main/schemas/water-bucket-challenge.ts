import Joi from 'joi'

export const WaterBucketChallengeSchema = Joi.object().keys({
  body: Joi.object().keys({
    bucketX: Joi.number().required().min(1),
    bucketY: Joi.number().required().min(1),
    amountWantedZ: Joi.number().required().min(1),
  })
})