import { io } from 'socket.io-client';
export const socket = io("http://127.0.0.1:5000");

socket.on("connect", () => {
    console.log("WebSocket connected");
});

socket.on("disconnect", (reason) => {
    console.log(`WebSocket disconnected: ${reason}`);
});