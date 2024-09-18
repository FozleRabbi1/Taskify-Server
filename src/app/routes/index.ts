import express from 'express';
import {  projectsRouter } from '../modules/Projects/Projects.routes';
import { UserRouter } from '../modules/User/user.route';
import { ProductsRouter } from '../modules/products/Products.routes';
import { TagsRouter } from '../modules/Tags/Tags.routes';
import { TodosRouter } from '../modules/Todos/Todos.routes';
import { NotesRouter } from '../modules/Notes/Notes.routes';
import { ContactsRouter } from '../modules/Contacts/ManageContacts/ManageContacts.route';
const router = express.Router();

const moduleRoutes = [
  { path: '/projects', route: projectsRouter },
  { path: '/auth', route: UserRouter },
  { path: '/tags', route: TagsRouter },
  { path: '/products', route: ProductsRouter },
  { path: '/todos', route: TodosRouter },
  { path: '/notes', route: NotesRouter },
  { path: '/contacts', route: ContactsRouter },
];

moduleRoutes.forEach((pathRouter) =>
  router.use(pathRouter.path, pathRouter.route),
);

export default router;



// {
//   "version": 2,
//   "builds": [
//     {
//       "src": "dist/server.js",
//       "use": "@vercel/node"
//     }
//   ],
//   "routes": [
//     {
//       "src": "/(.*)",
//       "dest": "dist/server.js",
//       "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
//     }
//   ]
// }


