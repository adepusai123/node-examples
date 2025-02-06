const Order = require('../models/orderModel');
const axios = require('axios');
const { validateOrder }  = require('../../../shared/validation');

const createOrder = async (req, res) => {
    const { productId, quantity } = req.body;

    const { error } = validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const productResponse = await axios.get(`http://product-service/api/products/${productId}`);
        const product = productResponse.data;

        if(!product) return res.status(404).send({message: 'Product not found'});   

        const totalPrice = product.product * quantity;
        const order = new Order({
            productId,
            quantity,
            totalPrice
        });
        await order.save();
        res.status(201).send(order);

    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

module.exports = { createOrder  };
