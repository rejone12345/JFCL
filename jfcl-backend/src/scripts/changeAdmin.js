import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';

// Reads parameters passed via command line:
// Usage: node src/scripts/changeAdmin.js <new_email> <new_password> [new_username]
const [newEmail, newPassword, newUsername] = process.argv.slice(2);

const updateAdmin = async () => {
  if (!newEmail || !newPassword) {
    console.error('\n❌ Error: Missing arguments.');
    console.log('Usage: node src/scripts/changeAdmin.js <new_email> <new_password> [new_username]');
    console.log('Example: node src/scripts/changeAdmin.js principal@jfcl.edu.bd MyNewPass@2026 myadmin\n');
    process.exit(1);
  }

  if (newPassword.length < 8) {
    console.error('\n❌ Password must be at least 8 characters long.\n');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    await connectDB();

    // Find the admin user
    let admin = await User.findOne({ role: 'admin' });

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    if (admin) {
      admin.email = newEmail.toLowerCase().trim();
      admin.password = hashedPassword;
      if (newUsername) {
        admin.username = newUsername.toLowerCase().trim();
      }
      await admin.save();
      console.log('\n✅ Admin account updated successfully in MongoDB:');
    } else {
      admin = await User.create({
        name: 'Principal Dr. M. Anwarul Haque',
        email: newEmail.toLowerCase().trim(),
        username: newUsername ? newUsername.toLowerCase().trim() : 'admin',
        password: hashedPassword,
        role: 'admin',
        designation: 'Institutional Administrator',
        status: 'active',
      });
      console.log('\n✅ Admin account created successfully in MongoDB:');
    }

    console.log('--------------------------------------------------');
    console.log(`Email:    ${admin.email}`);
    console.log(`Username: ${admin.username || 'admin'}`);
    console.log(`Password: ${newPassword}`);
    console.log('--------------------------------------------------\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to update admin credentials:', error.message);
    process.exit(1);
  }
};

updateAdmin();
