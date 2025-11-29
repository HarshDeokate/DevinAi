import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';
import { Server } from "socket.io";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import projectModel from './models/projectModel.js';

dotenv.config();

const server = http.createServer(app);

const io = new Server(server , {
  cors: {
    origin: "*"
  }
});

io.use(async(socket, next) => {
  try{
    const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[ 1 ];
    const projectId = socket.handshake.query.projectId;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return next(new Error('Invalid projectId'));
    }


    socket.project = await projectModel.findById(projectId);


    if (!token) {
        return next(new Error('Authentication error'))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
        return next(new Error('Authentication error'))
    }


    socket.user = decoded;

    next();
    
  }
  catch(error){
    console.log("Socket Auth Error");
    next(error)
  }
})

io.on('connection', Socket => {
  console.log("A User Connected");

  Socket.roomId = Socket.project._id.toString();

  Socket.join(Socket.roomId);

  Socket.on('projectMessage', (data) => { 
    console.log("Received project message:", data);
    Socket.broadcast.to(Socket.roomId).emit('projectMessage', data);
  });
  
  Socket.on('event', data => { /* … */ });
  Socket.on('disconnect', () => { /* … */ });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


