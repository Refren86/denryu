import { Router } from 'express';

import { userRouter } from './user.router';

const routes = Router();

routes.use('/api', userRouter);

export default routes;
