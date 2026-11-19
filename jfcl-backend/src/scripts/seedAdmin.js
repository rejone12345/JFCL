import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { seedUsers } from '../data/seedUsers.js';

const seedAdminAndData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();

    console.log('Checking for existing users...');
    const userCount = await User.countDocuments();

    if (userCount === 0) {
      console.log('Populating institutional users into MongoDB...');
      for (const u of seedUsers) {
        const hashedPassword = await bcrypt.hash(u.password, 12);
        await User.create({
          ...u,
          password: hashedPassword,
        });
      }
      console.log(`✅ Successfully seeded ${seedUsers.length} initial accounts into MongoDB!`);
    } else {
      console.log(`ℹ️ MongoDB already has ${userCount} users. Ensuring Admin account exists...`);
      const adminExists = await User.findOne({ role: 'admin' });
      if (!adminExists) {
        const hashedPassword = await bcrypt.hash('Admin@1234', 12);
        await User.create({
          name: 'Principal Dr. M. Anwarul Haque',
          email: 'admin@jfcl.edu.bd',
          username: 'admin',
          password: hashedPassword,
          role: 'admin',
          designation: 'Institutional Administrator',
          status: 'active',
        });
        console.log('✅ Created root Admin account in MongoDB.');
      } else {
        console.log(`✅ Root Admin account found: ${adminExists.email}`);
      }
    }

    console.log('\n--- Admin Login Credentials ---');
    console.log('Email:    admin@jfcl.edu.bd');
    console.log('Password: Admin@1234\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedAdminAndData();
