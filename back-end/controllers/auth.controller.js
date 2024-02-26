import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';


 export const signup = async (req, res, next) => {
          const { username, email, password} = req.body;
          const hashedPassword = bcryptjs.hashSync(password,10);
          const newUser = new User({username, email, password:hashedPassword});
          try{
            await newUser.save();    //newUser is going to be save inside the database
            res.status(201).json("User created successfully");
          }
          catch(error){
              //res.status(500).json(error.message);
              //since we create the middleware, we use the it instead of this statement
              //Import the middleware from index.js
              next(errorHandler(error.message));
          }
};


export const signin = async (req,res,next) =>{
    const {email,password} = req.body;
    try{
          const validUser = await User.findOne({email : email});
          if(!validUser){
            return next(errorHandler(404,'User Not Found'));
          }
          const validPassword = bcryptjs.compareSync(password,validUser.password);
          if(!validPassword){
            return next(errorHandler(401,'Wrong Credentials'));
          }
          const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)  //Create the JWT token
          res.cookie('access_token',token,{httpOnly :true}).status(200).json(validUser)  //After creating the JWT token, we need to save that token as the cookie
    }
    catch(error){
      next(error);
    }
};

export const google =  async (req,res,next) =>{
  
    try{
  
        const user = await User.findOne({email : req.body.email});
        
        if(user){
          const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
          const { password : pass, ...rest} = user._doc;   //separate the password and rest of the things are sent 
          res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
        }
  
        else{  //create a new user
  
          //Because in the User model(database) password is required, 
          // when we use google authentication to signin to the system 
          // there is no password, that is why we create a default password
          const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
          // we did not write password as it is into the database, we should hashed the password.
          const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
          const newUser = new User( {
            username : req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
            email : req.body.email,
            password : hashedPassword,
            avatar : req.body.photo,
          });
          await newUser.save();
          const token = jwt.sign({id : newUser._id}, process.env.JWT_SECRET);
          const {password : pass, ...rest} = newUser._doc;
          res
            .cookie('access_token',token, {httpOnly : true})
            .status(200)
            .json(rest)
        }
    }
  
    catch(error){
      next(error);
    }
};


 