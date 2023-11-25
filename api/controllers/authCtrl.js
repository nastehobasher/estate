import jwt  from 'jsonwebtoken'
import User from '../models/user.model.js'
import bcrypt from'bcrypt'
import { errorHandler } from'../utils/error.js'

export const signup = async(req,res,next) => {
    const {username,email,password} =req.body
    // encrypted password
    const hashedPassword = bcrypt.hashSync(password,10)
    const newUser = new User({username,email,password:hashedPassword})
    try{
        await newUser.save()
        res.status(201).json("signup created succesfuly")
    }catch(error){
        next(error)
    }
}

export const signIn = async(req,res,next) => {
    const {email,password} =req.body
    // encrypted password
    try{
        const findUser = await User.findOne({email})
        if(!findUser) return next(errorHandler(404,'User not found!'))
        const validPassword = bcrypt.compareSync(password,findUser.password)
        if(!validPassword) return next(errorHandler(401,'Wrong cridentials!'))
        const token = jwt.sign({id:findUser._id},process.env.JWT_SECRET);

        // we should encrypt the password
        const {password:pass, ...rest } = findUser._doc;
        res.cookie('access_token',token,{ httpOnly: true}).status(200).json(rest)
    }catch(error){
        next(error)
    }
}
