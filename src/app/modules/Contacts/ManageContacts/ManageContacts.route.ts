import express from 'express';
import { contactsController } from './ManageContacts.controller';

const router = express.Router();

router.post('/', contactsController.createContact );


export const ContactsRouter = router;
