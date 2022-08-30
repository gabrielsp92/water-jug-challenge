import { WaterBucketChallengeController } from '../presentation/controllers/water-bucket-challenge';
import { adaptRoute } from './adapters/express-router'
import { Router } from 'express'
import { WaterBucketChallengeSchema } from './schemas/water-bucket-challenge';
import { validatorMiddleware } from './middleware/validator'

export const setupRoutes = (app) => {

  app.get('/health-check', (req, res) => res.status(200).send({ Message: 'Up' }))

  const appRouter = Router();

  appRouter.post('/water-bucket-challenge',
    validatorMiddleware(WaterBucketChallengeSchema),
    adaptRoute(
      new WaterBucketChallengeController(),
      WaterBucketChallengeSchema
    ))

  app.use('/v1', appRouter)
}