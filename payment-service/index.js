const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const paymentRoutes = require('./routes/payment.route.js');

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


app.use('/api/payment', paymentRoutes);

mongoose.connect(process.env.MONGO_URI, {dbName : "payment"}).then( () => {
    console.log("Connected to MongoDB")}
  ).catch((err) => {
    console.log("Error: ", err);
  });


