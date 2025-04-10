 const Environment = {
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key', // Use environment variable in production
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/TMCP', // Use environment variable in production
    // ... other environment variables
};