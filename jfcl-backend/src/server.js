import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import { initUserRepository } from './repositories/userRepository.js';

const startServer = async () => {
  try {
    let storageMode = 'In-Memory (No DB)';
    if (env.MONGODB_URI) {
      try {
        await connectDB();
        storageMode = 'MongoDB Atlas';
      } catch (dbErr) {
        console.warn('⚠️ Could not connect to MongoDB Atlas. Falling back to In-Memory mode:', dbErr.message);
      }
    }

    // Initialise repository (hybrid)
    await initUserRepository();

    const server = app.listen(env.PORT, () => {
      console.log(`================================================================`);
      console.log(`🚀 JFCL School & College Backend API`);
      console.log(`📡 Server listening on port ${env.PORT} in ${env.NODE_ENV} mode`);
      console.log(`🔗 API Base: http://localhost:${env.PORT}/api/v1`);
      console.log(`🏥 Health Check: http://localhost:${env.PORT}/api/v1/health`);
      console.log(`💾 Active Database: ${storageMode}`);
      console.log(`================================================================`);
    });

    const shutdown = () => {
      console.log('\nGracefully shutting down JFCL API server...');
      server.close(() => {
        console.log('Server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
