import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User, Thought } from '../models/index.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB');
    console.log('Database connected. Seeding data...');

    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create users
    const users = await User.insertMany([
      { username: 'Alice', email: 'alice@example.com' },
      { username: 'Bob', email: 'bob@example.com' },
      { username: 'Charlie', email: 'charlie@example.com' },
      { username: 'David', email: 'david@example.com' },
      { username: 'Eve', email: 'eve@example.com' },
      { username: 'Frank', email: 'frank@example.com' },
      { username: 'Grace', email: 'grace@example.com' },
      { username: 'Hannah', email: 'hannah@example.com' },
      { username: 'Isaac', email: 'isaac@example.com' },
      { username: 'Jack', email: 'jack@example.com' }
    ]);

    // Create thoughts
    const thoughts = await Thought.insertMany([
      { thoughtText: 'This is a great day!', username: 'Alice' },
      { thoughtText: 'I love coding in JavaScript.', username: 'Bob' },
      { thoughtText: 'MongoDB is cool!', username: 'Charlie' },
      { thoughtText: 'Node.js makes backend easy.', username: 'David' },
      { thoughtText: 'Express.js simplifies APIs.', username: 'Eve' },
      { thoughtText: 'React is awesome!', username: 'Frank' },
      { thoughtText: 'Frontend and backend both are fun!', username: 'Grace' },
      { thoughtText: 'Mongoose makes MongoDB easy.', username: 'Hannah' },
      { thoughtText: 'Full-stack development is exciting!', username: 'Isaac' },
      { thoughtText: 'Debugging is an art.', username: 'Jack' }
    ]);

    // Associate thoughts with users
    for (let i = 0; i < users.length; i++) {
      await User.findByIdAndUpdate(users[i]._id, {
        $push: { thoughts: thoughts[i]._id }
      });
    }

    // Add friends (each user gets 2 friends for demonstration)
    await User.findByIdAndUpdate(users[0]._id, { $addToSet: { friends: [users[1]._id, users[2]._id] } }); // Alice
    await User.findByIdAndUpdate(users[1]._id, { $addToSet: { friends: [users[3]._id, users[4]._id] } }); // Bob
    await User.findByIdAndUpdate(users[2]._id, { $addToSet: { friends: [users[5]._id, users[6]._id] } }); // Charlie
    await User.findByIdAndUpdate(users[3]._id, { $addToSet: { friends: [users[7]._id, users[8]._id] } }); // David
    await User.findByIdAndUpdate(users[4]._id, { $addToSet: { friends: [users[9]._id, users[0]._id] } }); // Eve

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();