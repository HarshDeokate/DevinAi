import Project from '../models/projectModel.js';
import mongoose from 'mongoose';

export const createProject = async (name ,userId) => {
    if(!name){
        throw new Error('Project name is required');
    }
    if(!userId){
        throw new Error('User name is required');
    }

    const project = await Project.create({
        name,
        users: [userId]
    });

    return project;
}


