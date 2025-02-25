//reaction.ts
import { Schema, Document, Types } from 'mongoose';


interface IReaction extends Document {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

const reactionSchema = new Schema<IReaction>(
  { 
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
       },
    reactionBody: {
        type: String,
        maxlength: 280
    },
    username: {
         type: String,
         required: true
    },
    createdAt: {
          type: Date,
          default: Date.now,
          get: (createdAtVal: Date) => createdAtVal.toLocaleString()
    },
 
  },
  {
    toJSON: {
      getters: true,
    },
    id: false, //do not add an id field
  }
);


export default reactionSchema;
