import { Router } from 'express';

// Importing the test router
import authRouter from './auth.router.js';
import matchingRouter from './matching.router.js';
import profileRouter from './profile.router.js';
import testRouter from './test.router.js';

// Importing the auth router

const routers = Router();

routers.all('/ping', (req, res) => res.status(200).send('Pong!'));

routers.use('/test', testRouter);
routers.use('/auth', authRouter);
routers.use('/profile', profileRouter);
routers.use('/matching', matchingRouter);

export default routers;
