const Order = require('../models/orderModel');

// command to create a new order
const createOrder = async (customerName, totalAmount) => {
    const newOrder = new Order({ customerName, totalAmount });

    try {
        await newOrder.save();
        console.log(`Order created successfully: customerName: ${customerName}, totalAmount: ${totalAmount}`);
    } catch (error) {
        console.error(`Error creating order: ${error}`);
    }
}

module.exports = { createOrder };