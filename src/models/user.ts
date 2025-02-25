//user.ts
import { Schema, model, Document, ObjectId } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Schema.Types.ObjectId[];
  friends: Schema.Types.ObjectId[];
  friendCount: number; //virtual 
}

const userSchema = new Schema<IUser>(
  { 
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
       },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^([\w-]+(\.[\w-]+)*@\w+(\.\w+)+)$/, 'Please fill a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
          },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
          },
    ],  
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false, //do not add an id field
  }
);
userSchema.virtual('friendCount')
  .get(function (this: IUser) {
     return this.friends.length;
  })


// Initialize our User model
const User = model('user', userSchema);

export default User;