import { NextFunction, Request, Response } from 'express'
import { Schema } from 'joi';

export const validatorMiddleware = (inputSchema?: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
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
        return;
      }
    }
    next();
  }
}