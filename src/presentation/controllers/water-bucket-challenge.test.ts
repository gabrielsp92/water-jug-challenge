import { WaterBucketChallengeController } from './water-bucket-challenge'

describe('WaterBucketController', () => {
  it('should handle a request body and return a response with status 200', async () => {
    const controller = new WaterBucketChallengeController()
    const requestBody = {
      bucketX: 2,
      bucketY: 10,
      amountWantedZ: 4,
    }
    const response = await controller.handle({ body: requestBody })
    expect(response.status).toEqual(200)
  })
  it('should handle a request body and return a response with status 422', async () => {
    const controller = new WaterBucketChallengeController()
    const requestBody = {
      bucketX: -2,
      bucketY: 10,
      amountWantedZ: 4,
    }
    const response = await controller.handle({ body: requestBody })
    expect(response.status).toEqual(422)
  })
})