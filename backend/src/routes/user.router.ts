import { Router } from 'express';
import { body } from 'express-validator';

import authMiddleware from '../middlewares/auth.middleware';
import { userController } from '../controllers/user.controller';

const router = Router();

router.post(
  '/register',
  body('credentials.email').isEmail(),
  body('credentials.password').isLength({ min: 3, max: 32 }),
  userController.register
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers); // protected route

export const userRouter = router;
