import { WaterExchangeService } from "../../app/services/water-exchange";
import { InvalidCapacityError } from "../../domain/errors/invalid-capacity";
import { Controller } from "../contracts/controller";
import { serverError, ok, HttpRequest } from "../contracts/http";

export type Contract = {
  bucketX: number,
  bucketY: number,
  amountWantedZ: number
}

export class WaterBucketChallengeController implements Controller {

  async handle(req: HttpRequest<Contract>) {
    try {
      const { body } = req;
      const { bucketX, bucketY, amountWantedZ } = body
      const waterExchangeService = new WaterExchangeService(bucketX, bucketY)
      const result = await waterExchangeService.measure(amountWantedZ)
      return ok(result)
    } catch (error) {
      let statusCode = 500
      if (error instanceof InvalidCapacityError) statusCode = 422
      return serverError(error, statusCode)
    }
  }
}