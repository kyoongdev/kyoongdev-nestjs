import type { NextFunction, Request, Response } from 'express';

export const PaginationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const page = (req.query?.page || '1') as string;
  const limit = (req.query?.limit || '20') as string;

  const take = Number(limit) || 20;
  const skip = (Number(page) - 1) * take;

  req.take = take;
  req.skip = skip;

  next();
};
