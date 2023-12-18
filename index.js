const express = require ('express');
const urlRoute = require('./routes/url')
const register = require('./routes/register')
const { connectToMongoDB } = require('./connect')
const mongoose = require('mongoose')

const app = express();
const PORT =  8000;

const uri = `mongodb+srv://amkaushal:YjsV5IGwaIIil4xv@cluster0.kgfmoyf.mongodb.net/`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

connection.once('open', () => {
  console.log('Connected to MongoDB Atlas');
  // Now you can define your Mongoose models and perform operations
});
app.use(express.json())
app.use("/url", urlRoute);
app.use("/register",register )

app.listen(PORT, ()=> console.log(`Server started at Port: ${PORT}`))
// const myServer = http.createServer(app);
// myServer.listen(8000, ()=> console.log('Server Started'))