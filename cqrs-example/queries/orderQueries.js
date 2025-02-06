const Order = require('../models/orderModel');

// Query to get all orders

const getAllOrders = async () => {
    try {
        return await Order.find();
    } catch (error) {
        console.error('Error while getting all orders', error);
        return []
    }
}

// Query to get order by ID
const getOrderById = async (orderId) => {
    try {
        return await Order.findById(orderId);
    } catch (error) {
        console.error('Error while getting order by ID', error);
        return null;
    }
}

module.exports = { getAllOrders, getOrderById };
