import express from 'express';
import {  projectsRouter } from '../modules/Projects/Projects.routes';
import { UserRouter } from '../modules/User/user.route';
const router = express.Router();

const moduleRoutes = [
  { path: '/projects', route: projectsRouter },
  { path: '/auth', route: UserRouter },
];

moduleRoutes.forEach((pathRouter) =>
  router.use(pathRouter.path, pathRouter.route),
);

export default router;
