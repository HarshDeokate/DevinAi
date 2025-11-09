import Project from "../models/projectModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";
import * as projectService from "../services/projectService.js";
import {validationResult} from 'express-validator';

export const createProjectController = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try{
        

        const {name } = req.body;
        const loggedinUser = await User.findOne({email: req.user.email});
        const userId = loggedinUser._id;

        const newProject = await projectService.createProject(name,userId);

        res.status(201).json(newProject);
    }
    catch(error){
        console.log(error);
        res.status(400).send(error.message);
    }
    
}


export const getProjects = async (req, res) => {
    try{
        const loggedinUser = await User.findOne({email: req.user.email});
        const userId = loggedinUser._id;

        const projects =  await projectService.getProjectsByUserId(userId);

        return res.status(200).json(projects);

    }
    catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }
}

export const addUserProject = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try{
        const {projectId, users} =  req.body;

        const loggedinUser = await User.findOne({email: req.user.email});

        const project = await projectService.addUsersToProject({projectId, users , userId: loggedinUser._id});

        return res.status(200).json(project);
    }
    catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }
}

export const getProjectsById = async (req, res) => {
    try{
        const {projectId} = req.params;
        const project = await projectService.getProjectById(projectId);

        return res.status(200).json(project);
    }
    catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }

}
