import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken"; 
// import { json } from "express";
// import { JsonWebTokenError } from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [5, 'Email must be at least 5 characters long'],
    maxLength: [50, 'Email cannot exceed 50 characters']
  },
  password: {
    type: String,
    select: false,
  }    
});

userSchema.statics.hashPassword = async function(password) {
  const salt = await bcrypt.genSalt(10); 
  return await bcrypt.hash(password, salt);
};

userSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password ,this.password);
};

userSchema.methods.generatejwt  = function() {
    return jwt.sign({email: this.email}, process.env.JWT_SECRET, {expiresIn: '24h'});
};

export const User = mongoose.model('user', userSchema);
export default User;



