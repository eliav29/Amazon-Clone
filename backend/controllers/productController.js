import Product from '../models/Products.js'

export const productData = async (req, res) => {
    const products = await Product.find({});
    res.send(products);
}

export const getProductById = async (req, res) => {
    const {id} = req.params;

    const product = await Product.findById(id);
    res.send(product);

    // if(product){
    // } else{
    //     res.status(404).send({message: 'Product was not found'});
    // }
}

export const getProductByToken = async (req, res) => {
    const {token} = req.params;

    const product = await Product.findOne({token: token});
    if (product)
        res.send(product);
    else {
        res.status(404).send({message: 'Product was not found'});
    }
}
