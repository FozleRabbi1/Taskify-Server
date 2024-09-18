import express from 'express';
import { contactsController } from './ManageContacts.controller';

const router = express.Router();

router.post('/', contactsController.createContact );
router.get('/', contactsController.getAllContact );


export const ContactsRouter = router;
