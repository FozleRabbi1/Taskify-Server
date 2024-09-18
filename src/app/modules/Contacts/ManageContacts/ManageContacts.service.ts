import { TManageContacts } from "./ManageContacts.interface";
import { ManageContact } from "./ManageContacts.module";

const addContactInfoIntoDB = async (payload : TManageContacts) =>{
  const lastDocument = await ManageContact.findOne().sort({ _id: -1 }).exec();
    const lastDocumentId = lastDocument?.id || 0;
  const updateData = {
    ...payload,
    id : lastDocumentId + 1,
  }  
    const result = await ManageContact.create(updateData)
    return result  
  }

  const getAllContactDataFromDB = async () =>{
    const result = await ManageContact.find()
    return result.reverse()
  }



  export const contactsService = {
    addContactInfoIntoDB,
    getAllContactDataFromDB
  }

  