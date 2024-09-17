import { model, Schema } from 'mongoose';
import { TManageContacts } from './ManageContacts.interface';

const ManageContactSchema: Schema = new Schema<TManageContacts>({
    id: {
        type: Number,
        required: true
      },
    title: {
        type: String,
        required: true,
        trim: true
      },
      client: {
        type: String,
        required: true,
        trim: true
      },
      project: {
        type: String,
        required: true,
        trim: true
      },
      type: {
        type: String,
        required: true,
        trim: true
      },
      startsAt: {
        type: Date,
        required: true
      },
      endsAt: {
        type: Date,
        required: true
      },
      value: {
        type: Number,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      createdBy: {
        type: String,
        required: true,
        trim: true
      }
    }, {
      timestamps: true
    });

export const ManageContact = model<TManageContacts>('manageContact', ManageContactSchema);
