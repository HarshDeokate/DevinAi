import {Router} from 'express';
import { body } from 'express-validator';
import { createProjectController ,getProjects ,addUserProject,getProjectsById} from '../controller/projectController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';
import { getProjectsByUserId } from '../services/projectService.js';
const router = Router();

router.post('/create',
    authMiddleware.authUser,
    body('name').notEmpty().withMessage('Project name is required'),
    createProjectController
)

router.get('/', authMiddleware.authUser, getProjects);

router.put('/addUser', authMiddleware.authUser,
    body('projectId').notEmpty().withMessage('Project ID is required'),
    body('users').isArray().withMessage('Users must be an array').custom((users) => users.every(user => typeof user === 'string')).withMessage('Each user must be a string'),
    addUserProject);

router.get('/get-project/:projectId', authMiddleware.authUser, getProjectsById);
export default router;