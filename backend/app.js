const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// CORS setup - IMPORTANT!
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://your-vercel-app.vercel.app' // ← YAHAN APNA VERCEL URL DALNA
  ],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// FIXED MongoDB Connection
const MONGODB_URI = 'mongodb+srv://hybriduser:AmanG22%4012@hybrid-cluster.lq5enri.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=hybrid-cluster';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch(err => console.log('❌ MongoDB Error:', err));

const taskSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

// API Routes (same as before)
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title
    });
    
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});