const Product = require("../models/product");

const createProduct = async (req, res) => {
    try {
        const { name, description, price, image } = req.body;

        const product = new Product({
            name,
            description,
            price,
            image
        });

        await product.save();

        res.status(201).json({
            ok: true,
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, image } = req.body;

        const product = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            image
        }, { new: true });

        if (!product) {
            return res.status(404).json({
                ok: false,
                error: 'Product not found'
            });
        }

        res.status(200).json({
            ok: true,
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                ok: false,
                error: 'Product not found'
            });
        }

        res.status(200).json({
            ok: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            ok: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error,
        });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
};