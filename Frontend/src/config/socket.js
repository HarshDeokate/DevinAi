import socket from 'socket.io-client';

let socketInstance = null;

export const initializeSocket = (projectId) =>{
    socketInstance = socket(import.meta.env.VITE_BACKEND_URL, {
        auth: {
            token: localStorage.getItem('token')
        },
        query: {
            projectId
        }
    });

    return socketInstance;
}

export const sendMessage = (event , message) => {
    if(socketInstance){
        socketInstance.emit(event , message);
    }
}

export const receiveMessage = (event , callback) => {
    if(socketInstance){
        socketInstance.on(event , (data) => {
            callback(data);
        });
    }
}