import { Request, Response } from 'express'
import { Schema } from 'joi';
import { Controller } from '../../presentation/contracts/controller'



export const adaptRoute = (controller: Controller, inputSchema?: Schema) => {
  return async (req: Request, res: Response) => {
    if (inputSchema) {
      const { error } = inputSchema?.validate({
        body: req.body
      }, {
        abortEarly: false,
        stripUnknown: true,
        allowUnknown: true,
      })
      if (error) {
        res.status(400).json({ error: error.details })
      }
    }
    const httpResponse = await controller.handle({ body: req.body })
    res.status(httpResponse.status).json(httpResponse.data)
    return;
  }
}