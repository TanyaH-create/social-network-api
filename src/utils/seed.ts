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
      { username: 'Charlie', email: 'charlie@example.com' }
    ]);

    // Create thoughts
    const thoughts = await Thought.insertMany([
      { thoughtText: 'This is a great day!', username: 'Alice' },
      { thoughtText: 'I love coding in JavaScript.', username: 'Bob' },
      { thoughtText: 'MongoDB is cool!', username: 'Charlie' }
    ]);

    // Associate thoughts with users
    for (let i = 0; i < users.length; i++) {
      await User.findByIdAndUpdate(users[i]._id, {
        $push: { thoughts: thoughts[i]._id }
      });
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();