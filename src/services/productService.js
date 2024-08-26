const Product = require('../models/product');

const getAllProducts = async (page, limit) => {
    const skip = (page - 1) * limit;
    return await Product.find().skip(skip).limit(limit);
};

const getProductByCode = async (code) => {
    return await Product.findOne({ code });
};

const updateProductByCode = async (code, productData) => {
    return await Product.findOneAndUpdate({ code }, productData, { new: true });
};

const deleteProductByCode = async (code) => {
    return await Product.findOneAndUpdate({ code }, { status: 'trash' }, { new: true });
};

module.exports = {
    getAllProducts,
    getProductByCode,
    updateProductByCode,
    deleteProductByCode,
};
