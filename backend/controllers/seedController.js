import User from "../models/User.js"
import Product from '../models/Products.js'
import data from '../data.js'

const seedData = async (req, res) => {
    await User.deleteMany();
    await Product.deleteMany();

    const products = await Product.insertMany(data.products)
    const users = await User.insertMany(data.users)
    res.send({products, users});
}

export default seedData;