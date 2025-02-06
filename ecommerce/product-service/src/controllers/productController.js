const Product = require('../models/productModel');
const { ValidateProduct } = require('../validators/productValidator');

const createProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;

    const { error } = ValidateProduct(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const product = new Product({ name, description, price, stock});
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

module.exports = { createProduct };