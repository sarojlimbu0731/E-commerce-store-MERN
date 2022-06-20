import express from "express";
import Order from "../models/orderModel.js";
import {isAuth}  from "../utils.js";
import asyncHandler from "express-async-handler";

const orderRoutes = express.Router();

orderRoutes.post('/',isAuth, 
asyncHandler ( async(req,res)=>{
    const newOrder= new Order({
        orderItems: req.body.orderItems.map((x)=>({...x,product: x._id})),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id
    });
    const order= await newOrder.save();
    res.status(201).send({message:"New order created", order})
}));

orderRoutes.get(
  '/:id',
  isAuth,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order){
        res.send(order)
    }else{
        res.status(404).send({message:' Order Not Found'})
    }

  })
);

orderRoutes.get(
  '/:id/pay',
  isAuth,
  asyncHandler( async (req, res)=>{
    const order= await Order.findById(req.params.id);
    if (order){
      order.isPaid= true;
      order.paidAt= Date.now();
      order.paymentResult= {
        id: req.body.id,
        status: req.body.status,
        update_time:req.body.update_time,
        email_address:req.body.email_address
      };
      const updateOrder = await order.save();
      res.send({message:"Order Paid", order: updateOrder})
    }else{
      res.status(404).send({message:"Order Not Found"})
    }
  })
)



export default orderRoutes;
 