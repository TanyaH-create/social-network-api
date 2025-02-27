import { Thought, User } from '../models/index.js';
import { Request, Response } from 'express';

  // Retrieves all thoughts from the database and sends them in the response
  export const getThoughts = async (_req: Request, res: Response) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Retrieves a single thought by ID and sends it in a response
  export const getSingleThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No application with that ID' });
      }

      res.json(thought);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

// Creates a new thought and associates it with a user
  export const createThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        
        })
      }

      //res.json(`Created the thought 🎉`);
      res.json(thought);
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return;
    }
  }
  
 
  // Updates an existing thought
  export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return;
    }
  }

  // Deletes a thought by ID and removes its reference from the associated user
  export const deleteThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'No user found with this id!',
        });
      }

      res.json({ message: 'Thought successfully deleted!' });
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  // Add reaction t a thouht
export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { 
        reactions:
         {
             reactionBody: req.body.reactionBody,
             username: req.body.username
         }
       } 
      },
      { new: true, runValidators: true }
    );


    if (!thought) {
      return res.status(404).json({ message: 'No thought with this ID' });
    }

    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
};


  // Delete a user and associated thoughts
  export const deleteReaction = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId  } } },
          { new: true }
        );

      if (!thought) {
        return res.status(404).json({ message: 'No reaction with that ID' });
      }
      //return res.json({ message: 'Reaction deleted!' })
      return res.json(thought);
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }


