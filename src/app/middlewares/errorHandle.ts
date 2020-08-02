import { ErrorRequestHandler, Request, Response } from 'express';
import Youch from 'youch';

import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from 'routing-controllers';

@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  async error(
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: Function
  ): Promise<Response> {
    const { error } = await new Youch(err, req).toJSON();

    const html = await new Youch(err, req).toHTML();
    if (error.name === 'ErroHandleLib') {
      const { message, status } = error;
      if (process.env.NODE_ENV === 'development') {
        next();
        return res.status(status || 500).send(html);
      }
      next();
      return res.status(status || 500).json({
        error: message,
      });
    }

    if (process.env.NODE_ENV === 'development') {
      next();
      return res.status(500).send(html);
    }

    if (process.env.NODE_ENV === 'test') {
      next();
      return res.status(500).json(error);
    }

    next();
    return res.status(500).json({ error: 'Internal server error' });
  }
}
