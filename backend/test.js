const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://hybriduser:AmanG22%4012@hybrid-cluster.lq5enri.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=hybrid-cluster';

console.log('Connecting to MongoDB...');

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.log('❌ MongoDB Connection Failed:', err.message);
    process.exit(1);
  });