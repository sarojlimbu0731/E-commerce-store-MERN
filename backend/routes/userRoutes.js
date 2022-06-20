import express from "express";
import Users from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils.js";
import asyncHandler from "express-async-handler";


const userRoutes = express.Router();

userRoutes.post(
  '/signin',
  asyncHandler(async (req, res) => {
      const user= await Users.findOne({email:req.body.email})
      if (user){
          if ( bcrypt.compareSync(req.body.password, user.password)){
              res.send({
                  _id:user._id,
                  name:user.name,
                  email:user.email,
                  isAdmin:user.isAdmin,
                  password:user.password,
                  token: generateToken(user),
              });
               
              return;
          }
      }
      res.status(401).send({message:'Invalid email or password'})
  })
);

userRoutes.post(
    '/signup',
    asyncHandler( async (req, res)=> {
        const newUser =new Users({
            name:req.body.name,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password),
        });
        const user = await newUser.save();
                      res.send({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        token: generateToken(user),
                      });

    })
)

export default userRoutes;