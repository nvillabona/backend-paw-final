const ShoppingCart = require('../models/shoppingCart');


const getShoppingCartByUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const shoppingCart = await ShoppingCart.findOne({ user: userId }).populate('products.product');
        if (!shoppingCart) {
            return res.status(404).json({
                ok: false,
                error: 'Shopping cart not found',
            });
        }

        res.status(200).json({
            ok: true,
            shoppingCart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error,
        });
    }
};


const addProductToCart = async (req, res) => {
    const userId = req.params.userId;
    const { product, quantity, price } = req.body;

    try {
        const shoppingCart = await ShoppingCart.findOne({ user: userId });
        if (!shoppingCart) {
            const newShoppingCart = new ShoppingCart({
                user: userId,
                products: [{ product, quantity, price }],
            });
            await newShoppingCart.save();
        } else {
            const existingProduct = shoppingCart.products.find((item) => item.product.toString() === product);
            console.log(existingProduct)
            if (existingProduct) {
                const index = shoppingCart.products.indexOf(existingProduct)
                existingProduct.quantity += quantity;
                shoppingCart.products[index] = existingProduct;

            } else {
                shoppingCart.products.push({ product, quantity, price });
            }

            await shoppingCart.save();
        }

        res.status(200).json({
            ok: true,
            shoppingCart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error,
        });
    }
};


const removeProductFromCart = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    try {
        const shoppingCart = await ShoppingCart.findOne({ user: userId });
        if (!shoppingCart) {
            return res.status(404).json({
                ok: false,
                error: 'Shopping cart not found',
            });
        }

        // Find the index of the product in the products array
        const productIndex = shoppingCart.products.findIndex(
            (product) => product.product.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({
                ok: false,
                error: 'Product not found in shopping cart',
            });
        }

        // Remove the product from the products array
        shoppingCart.products.splice(productIndex, 1);
        await shoppingCart.save();

        res.status(200).json({
            ok: true,
            shoppingCart,
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
    getShoppingCartByUser,
    addProductToCart,
    removeProductFromCart,
};
