import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import Users from '../models/userModel.js';

const seedRoutes=express.Router();  //seedrouter is object from the express.router function 
seedRoutes.get('/',async (req,res)=>{
    await Product.deleteMany({})   // removing all the record from  product model 
    const createdProducts =await Product.insertMany(data.products);

    await Users.remove({});
    const createdUsers = await Users.insertMany(data.users);
    res.send({createdProducts, createdUsers}) //sending the products to the frontend

}) //takes two parameter 1st one is path and 2nd one is the async function

export default seedRoutes;