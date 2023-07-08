import { io } from "socket.io-client";

export const socket = io("ws://localhost:3700" /* { autoConnect: false } */);
