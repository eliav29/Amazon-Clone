import Product from '../models/Products.js'

const productData = async (req, res) => {
    const products = await Product.find({});
    res.send(products);
}

export default productData;