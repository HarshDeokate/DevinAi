import {Router} from 'express';
import { body } from 'express-validator';
import { createProjectController } from '../controller/projectController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';
const router = Router();

router.post('/create',
    authMiddleware.authUser,
    body('name').notEmpty().withMessage('Project name is required'),
    createProjectController
)

export default router;