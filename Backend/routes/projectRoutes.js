import {Router} from 'express';
import { body } from 'express-validator';
import { createProjectController } from '../controller/projectController.js';

const router = Router();

router.post('/create',
    body('name').notEmpty().withMessage('Project name is required'),
    createProjectController
)

export default router;