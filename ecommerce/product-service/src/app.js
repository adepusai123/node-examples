const express  = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });

app.use('/api/products', productRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Product Service running on port ${port}`);
});

module.exports = app;