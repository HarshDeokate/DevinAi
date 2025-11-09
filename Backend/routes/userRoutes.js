import * as userController from '../controller/userController.js';
import {Router} from 'express';
import {body} from 'express-validator';
import authMiddleware from '../middleware/authMiddleware.js';


const router = Router();

router.post('/register',
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    userController.createUserControl);

router.post('/login',
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    userController.loginUserControl);

router.get('/profile', authMiddleware.authUser, userController.getUserProfileControl);

router.get('/logout', authMiddleware.authUser, userController.logoutUserControl);

router.get('/all', authMiddleware.authUser, userController.getAllUsersControl);
export default router;