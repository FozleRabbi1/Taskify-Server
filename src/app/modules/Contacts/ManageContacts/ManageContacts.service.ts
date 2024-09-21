import mongoose from "mongoose";
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

  const getAllContactDataFromDB = async (query: Record<string, unknown>) => {
    if (query?.date && query?.fieldName) {
      const [startDate, endDate] = (query.date as string).split(',').map(date => new Date(date));
      const fieldName = query.fieldName as string;
      const pipeline = [
        {
          $match: {
            [fieldName]: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
      ];
  
      const result = await ManageContact.aggregate(pipeline).exec();
      return result.reverse();
    } else {
      const contactQuery = new QueryBuilder(
        ManageContact.find(), query
      )
        .search(["title"]) 
        .filter(); 
  
      const result = await contactQuery.modelQuery;
      return result.reverse();
    }
  };

  const updateContactIntoDB = async (id: string,  payload: Partial<TManageContacts>) => {    
    const result = await ManageContact.findByIdAndUpdate(id, payload, {
      new: true, 
      runValidators: true,
    });
    return result
  };

  const deleteContactsIntoDB = async (payload : string[] ) => {
    try {
      if (!Array.isArray(payload) || !payload.every(id => typeof id === 'string')) {
        throw new Error('Invalid payload format');
      }
      const objectIds = payload.map(id => new mongoose.Types.ObjectId(id));
  
      const result = await ManageContact.deleteMany({ _id: { $in: objectIds } });
      return result;
    } catch (error) {
      console.error('Error deleting Contacts:', error);
      throw error;
    }
  };


  const duplicateDataIntoDB = async (mainId: string, title: string) => {
    try {
      const lastDocument = await ManageContact.findOne().sort({ _id: -1 }).exec();
      const lastDocumentId = lastDocument?.id || 0;
  
      const contact = await ManageContact.findById(mainId);
      if (!contact) {
        throw new Error('Project not found');
      }

      const newPContactData = contact.toObject() as Partial<typeof contact> & { _id?: mongoose.Types.ObjectId };
      delete newPContactData._id;  
      const startsAt = new Date();
      const endsAt = new Date(startsAt);
      endsAt.setDate(startsAt.getDate() + 5);  
      const formatDate = (date: Date) => date.toISOString();   
      const newProject = new ManageContact({
        ...newPContactData,
        title,
        id: lastDocumentId + 1,
        startsAt: formatDate(startsAt), 
        endsAt: formatDate(endsAt)  
      });   
      
      await newProject.save();
      return newProject;
    } catch (error) {
      console.error('Error duplicating project:', error);
      throw error; 
    }
  }; 



  export const contactsService = {
    addContactInfoIntoDB,
    getAllContactDataFromDB,
    updateContactIntoDB,
    deleteContactsIntoDB,
    duplicateDataIntoDB
  }

  