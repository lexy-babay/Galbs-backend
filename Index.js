// index.js
const express       = require('express');
const dotenv        = require('dotenv');
const connectDB     = require('./dbconnect/dbconfig');
const authRoutes    = require('./routes/authRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const cors          = require('cors');
const seedOwner     = require('./seeder');

dotenv.config();

async function startServer() {
  try {
    // 1. Connect to MongoDB
    await connectDB();
    console.log('🗄️  MongoDB connected');

    // 2. Seed the owner user if needed
    await seedOwner();

    // 3. Initialize Express
    const app = express();
    const PORT = process.env.PORT || 5000;

    // 4. Middleware
    app.use(cors());
    app.use(express.json());

    // 5. Routes
    app.use('/auth', authRoutes);
    app.use('/api', invoiceRoutes);


    // Invoice endpoints
    // Health check
    app.get('/', (req, res) => res.send('API is running...'));

    // 6. Start server
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('🔴 Startup error:', err);
    process.exit(1);
  }
}

startServer();
