const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const auth = require('./middleware/auth'); 
dotenv.config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

const authRoutes = require('./routes/authRoutes');

app.use(express.json());

app.use(cors());

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/auth', authRoutes);

app.get('/protected', auth, (req, res) => {
  res.send('This is a protected route, you are authenticated!');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
