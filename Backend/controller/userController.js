import { validationResult } from 'express-validator';
import User from '../models/userModel.js';
import * as userServices from '../services/userServices.js';
import redisClient from '../services/redisService.js';

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
        
        //remove password from response
        user.password = undefined;        
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

        // Remove password from response
        user.password = undefined;
    
        
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

    return res.status(200).json({
        user: req.user
    });

};

export const logoutUserControl = async (req, res) => {
    try {
        // Invalidate the token in Redis
        const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
        
        // if (!token && req.headers.authorization) {
        //     token = req.headers.authorization.split(" ")[1]; // Expecting "Bearer <token>"
        // }
        if (token) {
            await redisClient.set(token, 'logout', 'EX', 24 * 60 * 60); // Set expiration to 24 hours
        }
        
        // Clear the cookie
        res.clearCookie('token');

        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    }
    catch (error) {
        console.error('Logout error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'An error occurred during logout',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const getAllUsersControl = async (req, res) => {
    try {
        const loggedInUser = await User.findOne({ email: req.user.email });
        const userId = loggedInUser._id;

        const users = await userServices.getAllUsers({userId});
        return res.status(200).json({
            success: true,
            data: users
        });
    }
    catch (error) {
        console.error('Get all users error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching users',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};