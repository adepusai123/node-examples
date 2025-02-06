const Joi = require('joi')

// Product validation schema

const validateProduct = (product) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().optional().max(500),
        price: Joi.number().required(),
        stock: Joi.number().required()
    })

    return schema.validate(product)
}

// Order validation schema

const validateOrder = (order) => {
    const schema = Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().greater(0).required()
    })

    return schema.validate(order)
}

module.exports = { validateProduct, validateOrder }
