import express from 'express';
import { contactsController } from './ManageContacts.controller';

const router = express.Router();

router.get('/', contactsController.getAllContact );
router.post('/', contactsController.createContact );
router.post('/:id', contactsController.duplicateData );
router.patch('/:id', contactsController.updatesContactInfo );
router.delete('/', contactsController.deleteContacts );


export const ContactsRouter = router;
