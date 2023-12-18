const mongoose = require('mongoose');

// Replace the <username>, <password>, and <dbname> with your MongoDB Atlas credentials
const username = 'amkaushal';
const dbname = 'Cluster0';

const uri = `mongodb+srv://amkaushal:<password>@cluster0.kgfmoyf.mongodb.net/`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

connection.once('open', () => {
  console.log('Connected to MongoDB Atlas');
  // Now you can define your Mongoose models and perform operations
});

