require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todoapp';
app.use(express.json());
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
app.use('/', todoRoutes);
app.get('/', (req, res) => {
  res.send('Todo API is running');=\
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
