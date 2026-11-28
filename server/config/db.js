const mongoose = require('mongoose');

let connectionPromise = null;

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is missing. Add it to .env (local) or to Vercel → Settings → Environment Variables');
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(uri, { maxPoolSize: 5, serverSelectionTimeoutMS: 10000, socketTimeoutMS: 45000 })
      .then((m) => {
        console.log(`MongoDB connected: ${m.connection.host}/${m.connection.name}`);
        return m.connection;
      })
      .catch((err) => {
        connectionPromise = null;
        throw err;
      });
  }

  return connectionPromise;
}

module.exports = { connectDB };