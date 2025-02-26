import { Thought, User } from '../models/index.js';
import { Request, Response } from 'express';


  // TODO: Add comments to the functionality of the getApplications method
  // Retrieves all application from the database and sends them in the response
  export const getThoughts = async (_req: Request, res: Response) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // TODO: Add comments to the functionality of the getSingleApplication method
  // Retrieves a single application by ID and sends it in a response
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

// TODO: Add comments to the functionality of the createApplication method
// Creates a new application and associates it with a user
// $addToSet adds a value to an array only if it does not already exist
// $push adds a value to an array regardless of whether it's already present
//   - query finds a user matching _id,  
//   - attempts o add application ._id to the application array inside the USer document
//   - if it already exists, nothing happens
//  - new:true ensures that the updayed document is returned instead of the old one
  export const createThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        })
      }

      res.json('Created the thought 🎉');
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return;
    }
  }
  
  // TODO: Add comments to the functionality of the updateApplication method
  // UPdates and existing application 
  // $set is used to update specific fields in a dicument. If the field already
  // exists, it updayes the value. If the field does not exist, $set creates it
  //   - query finds the application with _id in request parameters
  //   - it replaces only the fields provided in the req.body
  //   - if the field does not exists it is created
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

  // TODO: Add comments to the functionality of the deleteApplication method
  // Deletes an application by ID and removes its reference from the associated user
  // $pull - is used to remove specific values from an array
  //   - query finds the record with _id and deletes it
  //   - $pull is used to remove the application ID from user's applications array
  //   - This ensures that after the app is deleted, it is also removed from any user's applications array
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
          message: 'Thought created but no user with this id!',
        });
      }

      res.json({ message: 'Thought successfully deleted!' });
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

   // TODO: Add comments to the functionality of the addTag method
   // Adds a new tag to an existing application
   //    - find the application document with _id
   //    - Use $addToSet to add the tag to 'tags' array of it does not exist
   //   -  runValidators: true ensures that the tag being added meets the schema's validation rules:
   //        tag schema: Must have a tag body, max length is 25
   //   - new: true ensures updates application is returned instead of the old version
  // export const addTag = async (req: Request, res: Response) => {
  //   try {
  //     const application = await Thought.findOneAndUpdate(
  //       { _id: req.params.applicationId },
  //       { $addToSet: { tags: req.body } },
  //       { runValidators: true, new: true }
  //     );

  //     if (!application) {
  //       return res.status(404).json({ message: 'No application with this id!' });
  //     }

  //     res.json(application);
  //     return;
  //   } catch (err) {
  //     res.status(500).json(err);
  //     return;
  //   }
  // }

  // TODO: Add comments to the functionality of the addTag method
  // Removes a tag from an existing application by ID
  //  - FInds the application with the _id and updates it
  //  - $pull removes an element from the tags array where tagId matches the params.tagId
    //   -  runValidators: true ensures that the tag being added meets the schema's validation rules:
   //        
   //   - new: true ensures updates application is returned instead of the old version 
  // export const removeTag = async (req: Request, res: Response) => {
  //   try {
  //     const application = await Application.findOneAndUpdate(
  //       { _id: req.params.applicationId },
  //       { $pull: { tags: { tagId: req.params.tagId } } },
  //       { runValidators: true, new: true }
  //     );

  //     if (!application) {
  //       return res.status(404).json({ message: 'No application with this id!' });
  //     }

  //     res.json(application);
  //     return;
  //   } catch (err) {
  //     res.status(500).json(err);
  //     return;
  //   }
  // }

