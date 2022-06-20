import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRoutes from "./routes/seedRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";


dotenv.config(); // fetch the variable from the .env files

//connecting to the mongoDb database
mongoose.connect(process.env.MONGODB_URI).then( ()=>{
  console.log("connected to the mongoDB");
}).catch(err =>{
  console.log(err.message)
})

const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/seed',seedRoutes);
app.use('/api/products',productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.get('/api/keys/paypal', (req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.use((err,req,res,next)=>{
  res.status(500).send({message:err.message});
});

const port =process.env.PORT || 5000;


app.listen(port, ()=>{
    console.log(`server running on port ${port}`)

})

