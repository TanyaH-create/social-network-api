//thought.ts

import { Schema, model, Document } from 'mongoose';
import reactionSchema, { IReaction } from './Reaction.js'; // Import the schema and interface

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: String;
  reactions: IReaction[];
  reactionCount: number;
}

const thoughtSchema = new Schema<IThought>(
  { 
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
       },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: Date): any => {
            if (!timestamp) return null;
            return new Date(timestamp).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            });
        }
    },
    username:  {
            type: String,
            required: true
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false, //do not add an id field
  }
);
thoughtSchema.virtual('reactionCount')
  .get(function (this: IThought) {
     return this.reactions.length;
  })


// Initialize our User model
const Thought = model('Thought', thoughtSchema);

export default Thought;