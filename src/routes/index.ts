import { Router } from 'express';
import redis from 'redis';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import redisConfig from '@config/redis';

// import UserController from '@controllers/UserController';

// import validateUserStore from '@validators/UserStore';

const routes = Router();

const bruteStore = new BruteRedis({
  client: redis.createClient({
    ...redisConfig,
    port: redisConfig.port ? +redisConfig.port : 0,
  }),
});

const bruteForce = new Brute(bruteStore);

// routes.post('/users/commom', validateUserStore, UserController.store);
// routes.get('/users', UserController.index);

export default routes;
