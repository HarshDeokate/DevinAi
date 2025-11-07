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
