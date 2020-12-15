import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export default function ensureAuthenticated (
  request: Request,
  response: Response,
  next: NextFunction
): void {
  // validacao do token jwt

  const authHeader = request.headers.authorization;

  if(authHeader) {
    throw new Error('JWT is missing');
  }

  // Bearer DAOIHOIQÇHNDkal

  const [, token] = authHeader.split(' ');


}
