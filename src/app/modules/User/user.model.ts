import { Schema, model } from 'mongoose';
import { TUser, TUserName, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const studentNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [10, 'name can not be more then 10 character'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
  },
});

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: studentNameSchema,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: 0,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],    
      enum: ["user" , "Admin" , "client" , "member" , "product manager" , 'developer'],
    },
    image : {
      type : String,
      require : [true, "Image is required"]
    }
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
userSchema.statics.isUserExistsByCustomeId = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
