const productService = require('../services/productService');

const getAllProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const products = await productService.getAllProducts(page, limit);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter produtos', error });
    }
};

const getProductByCode = async (req, res) => {
    try {
        const { code } = req.params;
        const product = await productService.getProductByCode(code);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter produto', error });
    }
};

const updateProductByCode = async (req, res) => {
    try {
        const { code } = req.params;
        const product = await productService.updateProductByCode(code, req.body);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar produto', error });
    }
};

const deleteProductByCode = async (req, res) => {
    try {
        const { code } = req.params;
        const product = await productService.deleteProductByCode(code);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json({ message: 'Produto marcado como trash', product: product });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar produto', error });
    }
};

module.exports = {
    getAllProducts,
    getProductByCode,
    updateProductByCode,
    deleteProductByCode,
};
