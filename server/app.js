const express = require('express');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/auth/auth.routes');
const donationRoutes = require('./routes/donations/donation.routes');
const requestRoutes = require('./routes/requests/request.routes');
const dashboardRoutes = require('./routes/dashboard/dashboard.routes');

const app = express();

app.use(express.json());

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/dashboard', dashboardRoutes);

module.exports = app;