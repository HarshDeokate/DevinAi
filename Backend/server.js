import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});