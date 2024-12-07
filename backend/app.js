// app.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const artworkRoutes = require('./routes/artworks');
const interactionRoutes = require('./routes/interactions');
const notificationRoutes = require('./routes/notifications');
const purchaseRoutes = require('./routes/purchase');
const followRoutes = require('./routes/follows');
const messageRoutes = require('./routes/messages');
const savedArtworkRoutes = require('./routes/savedArtworks');

const app = express();

// Apply CORS middleware
app.use(cors({ origin: '*'}));

// Parse JSON bodies
app.use(express.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  if (req.method === 'OPTIONS') {
    return next();
  }
  next();
});

// Handle preflight OPTIONS requests
app.options('*', cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/saved-artworks', savedArtworkRoutes);

// Sync Database and Start Server
sequelize.sync({ alter: true }).then(() => {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = app;