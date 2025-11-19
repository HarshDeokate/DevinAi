import socket from 'socket.io-client';

let socketInstance = null;

export const initializeSocket = () =>{
    socketInstance = socket(import.meta.env.backendUrl, {
        auth: {
            token: localStorage.getItem('token')
        }
    });

    return socketInstance;
}