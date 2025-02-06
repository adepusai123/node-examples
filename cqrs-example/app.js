const express = require('express');
const mongoose = require('mongoose');
const { createOrder} = require('./commands/orderCommands');
const { getAllOrders, getOrderById } = require('./queries/orderQueries');


const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/cqrs-example', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {  
    console.error('Error while connecting to MongoDB', error);
} );

// Command route: creae a new order
app.post('/order', async (req, res) => {
    const { customerName, totalAmount} = req.body;
    if(!customerName || !totalAmount) {
     return res.status(400).send('Customer name and total amount are required');
    }
    await createOrder(customerName, totalAmount);
    res.status(201).send('Order Created Successfully');
});

// Query route: get all orders
app.get('/orders', async (req, res) => {
    const orders = await getAllOrders();
    res.status(200).json(orders);
});

// Query route: get order by ID
app.get('/order/:id', async (req, res) => {
    const order = await getOrderById(req.params.id);
    if(!order) {
        return res.status(404).send('Order not found');
    }
    res.status(200).json(order);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

