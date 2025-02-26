import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, addFriend, removeFriend } from '../../controllers/userController.js';

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend) // Add a friend
  .delete(removeFriend); // Remove a friend

export default router;
