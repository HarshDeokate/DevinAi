import Project from '../models/projectModel.js';
import User from '../models/userModel.js';
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

export const getProjectsByUserId = async (userId) => {
    if(!userId){
        throw new Error('User ID is required');
    }
    const projects = await Project.find({users: userId});
    return projects;
}

export const addUsersToProject = async ({projectId, users}) => {
    if(!projectId){
        throw new Error('Project ID is required');
    }
    if(!users || !Array.isArray(users) || users.length === 0){
        throw new Error('Users array is required');
    }
    const project = await Project.findById(

        {
            _id: mongoose.Types.ObjectId(projectId),
            users:users.map(id => mongoose.Types.ObjectId(id))
        }
    );
    if(!project){
        throw new Error('Project not found');
    }       
    
    const updatedProject = await Project.findByIdAndUpdate({
        _id: projectId,
    },
    {
        $addToSet: {users: {$each: users.map(id => mongoose.Types.ObjectId(id))}}
    },
    {new: true}
    );

    return updatedProject;
}

export const getProjectById = async (projectId) => {
    if(!projectId){
        throw new Error('Project ID is required');
    }
    const project = await Project.findOne
    ({_id: projectId}).populate('users');
    return project;
}


