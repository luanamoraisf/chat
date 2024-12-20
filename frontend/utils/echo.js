import Echo from "laravel-echo";
import { io } from "socket.io-client";

export const initializeEcho = () => {
    const echo = new Echo({
        broadcaster: "socket.io",
        host: process.env.NEXT_PUBLIC_SOCKET_URL,
        client: io,
    });
    return echo;
};