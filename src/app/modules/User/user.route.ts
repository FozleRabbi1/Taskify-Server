import express from 'express';
import { userController } from './user.controller';
import { UserValidation } from './user.validation';
import { validateRequest } from '../../middleware/validateRequest';

const router = express.Router();



router.get(
  '/',
  userController.getAllUser,
);

router.get(
  '/:email',
  userController.getSingleUser,
);

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserValidationSchema),
  userController.createUser,
);

router.post(
  '/login',
  validateRequest(UserValidation.loginValidationSchema),
  userController.loginUser,
);

router.put(
  '/logOut',
  userController.logOutUser,
);


router.post(
  '/refresh-token',
  validateRequest(UserValidation.refreshTokenValidationSchema),
  userController.refreshToken,
);

router.delete('/', userController.deleteUser);

export const UserRouter = router;
