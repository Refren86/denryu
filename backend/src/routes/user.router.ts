import { Router } from 'express';
import { body } from 'express-validator';

import authMiddleware from '../middlewares/auth.middleware';
import avatarMiddleware from '../middlewares/avatar.middleware';
import usernameMiddleware from '../middlewares/username.middleware';
import { userController } from '../controllers/user.controller';

const router = Router();

router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.register
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);

router.get('/users', authMiddleware, userController.getUsers); // protected route
router.patch(
  '/user/:userId',
  authMiddleware,
  usernameMiddleware,
  userController.updateUser
);
router.patch(
  '/user/:userId/avatar',
  authMiddleware,
  avatarMiddleware,
  userController.uploadUserAvatar
);

export const userRouter = router;
