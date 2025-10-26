import { validationResult } from 'express-validator';
import User from '../models/userModel.js';
import * as userServices from '../services/userServices.js';

/**
 * Create a new user
 * @route POST /api/users/register
 */
export const createUserControl = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false,
            message: 'Validation failed',
            errors: errors.array() 
        });
    }

    try {
        const user = await userServices.createUser(req.body);
        const token = await user.generatejwt();
        
        
        return res.status(201).json({
            success: true,
            data: { user, token }
        });
    } catch (error) {
        console.error('User creation error:', error);
        return res.status(400).json({
            success: false,
            message: 'Failed to create user',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Authenticate user and return JWT token
 * @route POST /api/users/login
 */
export const loginUserControl = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false,
            message: 'Validation failed',
            errors: errors.array() 
        });
    }
    
    try {
        const { email, password } = req.body;
        
        // Find user with password field included
        const user = await User.findOne({ email }).select('+password');
        
        // Generic error message to prevent user enumeration
        const authError = {
            success: false,
            message: 'Invalid email or password'
        };

        if (!user) {
            return res.status(401).json(authError);
        }
        
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(401).json(authError);
        }
        
        const token = await user.generatejwt();
    
        
        return res.status(200).json({
            success: true,
            data: { user, token }
        });
    } catch (error) {
        console.error('Login error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'An error occurred during login',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const getUserProfileControl = async (req, res) => {
    
    console.log("req.user:", req.user);
    

    res.status(200).json({
        user: req.user
    });

};