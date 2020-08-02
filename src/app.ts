import 'reflect-metadata';
import 'dotenv-flow/config';

import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import redis from 'redis';
import RateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';
import * as Sentry from '@sentry/node';
import 'express-async-errors';
import { useExpressServer } from 'routing-controllers';
import { useSocketServer } from 'socket-controllers';
import { resolve } from 'path';

import redisConfig from '@config/redis';
import rateLimitConfig from '@config/rateLimit';
import sentryConfig from '@config/sentry';

import { initDataBase } from './database';

class App {
  public server: express.Application;

  async run(): Promise<express.Application> {
    await initDataBase();

    this.server = express();
    this.socketInit();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();

    return this.server;
  }

  private middlewares(): void {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(helmet());

    this.server.use(
      // cors({
      //   origin: process.env.FRONT_URL,
      // })
      cors()
    );

    this.server.use(express.json());

    if (process.env.NODE_ENV === 'production') {
      this.server.use(
        new RateLimit({
          store: new RateLimitRedis({
            client: redis.createClient({
              ...redisConfig,
              port: redisConfig.port ? +redisConfig.port : 0,
            }),
          }),
          ...rateLimitConfig,
        })
      );
    }
  }

  private routes(): void {
    this.server.use(Sentry.Handlers.errorHandler());
  }

  private socketInit(): void {}
}

export default async (): Promise<http.Server> => {
  const app = await new App().run();

  const server = new http.Server(app);

  const io = socketIO(server);

  useSocketServer(io, {
    controllers: [
      `${resolve(__dirname, 'app', 'controllers', 'sockets')}/*.${
        process.env.NODE_ENV === 'production' ? 'js' : 'ts'
      }`,
    ],
  });

  useExpressServer(app, {
    defaultErrorHandler: false,
    routePrefix: `/api/v${process.env.API_VERSION}`,
    controllers: [
      `${resolve(__dirname, 'app', 'controllers', 'api')}/*.${
        process.env.NODE_ENV === 'production' ? 'js' : 'ts'
      }`,
    ],
    middlewares: [
      `${resolve(__dirname, 'app', 'middlewares')}/*.${
        process.env.NODE_ENV === 'production' ? 'js' : 'ts'
      }`,
    ],
  });

  return server;
};
