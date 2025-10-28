const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');


const app = express();
const PORT = 4000;

// Middleware to parse JSON requests
app.use(express.json());

const redisClient = redis.createClient({
  url: 'redis://redis:6379' // Docker service name
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.connect().then(() => {
  console.log('✅ Connected to Redis');
});



const DB_USER = process.env.MONGO_INITDB_ROOT_USERNAME;
const DB_PASS = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DB_HOST = 'mongo'; // Docker service name
const DB_PORT = 27017;
// Connect to MongoDB
mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}`).then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));;

// Simple route
app.get('/', (req, res) => {
  res.send('Hello from Express!ssss');
});

// Example POST route
app.post('/data', (req, res) => {
  const body = req.body;
  res.json({ message: 'Data received', body });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
