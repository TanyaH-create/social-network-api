import { User, Thought } from '../models/index.js';
import { Request, Response } from 'express';


  // Get all users
  export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //Get a single user
  export const getSingleUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userId })
         .populate( {path: 'thoughts friends', select:'-__v' })
         .populate( {                            
               path: 'friends', 
               select:'-__v',
        //       populate: { path: 'friends', select: '-__V' },     //populate the friends of friends - removed, was very cluttered
          });
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }


  // create a new user
  export const createUser = async (req: Request, res: Response) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
// update a user
    export const updateUser = async (req: Request, res: Response) => {
      try {
        const user = await User.findByIdAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        );

        if (!user) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(user);
        return;
      } catch (err) {
        res.status(500).json(err);
        return;
      }
    }

  // Delete a user and associated thoughts
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and associated thoughts deleted!' })
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

// Add friend - allow a user to add another user as a friend
export const addFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with this ID' });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Remove a friend from a user's friend list
export const removeFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with this ID' });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};
