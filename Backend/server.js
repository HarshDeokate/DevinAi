import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';
import { Server } from "socket.io";
import jwt from 'jsonwebtoken';

dotenv.config();

const server = http.createServer(app);

const io = new Server(server , {
  // cors: {
  //   origin: "*"
  // }
});

io.use((socket, next) => {
  try{
    const token = socket.handshake.auth.token || socket.handshake.headers.authorization.split(' ')[1];
    if(!token){
      return next(new Error("Authentication error: Token not provided"));
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded){
      return next(new Error("Authentication error: Invalid token"));
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
  Socket.on('event', data => { /* … */ });
  Socket.on('disconnect', () => { /* … */ });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


