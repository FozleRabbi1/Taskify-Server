import QueryBuilder from "../../../builder/QueryBuilder";
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

  const getAllContactDataFromDB = async (query: Record<string, unknown>) =>{
    const contactQuery = new QueryBuilder(
      ManageContact.find(), query,
    )
      .search(["title"])
      .filter()
    
    const result = await contactQuery.modelQuery;

    return result.reverse()
  }



  export const contactsService = {
    addContactInfoIntoDB,
    getAllContactDataFromDB
  }

  