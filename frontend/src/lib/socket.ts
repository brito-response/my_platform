// src/lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function initSocket(token: string) {
  if (socket) return socket;

  socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", {
    path: "/socket.io",
    autoConnect: false,
    auth: { token },
    transports: ["websocket", "polling"],
  });

  socket.on("connect_error", (err) => {
    console.error("Erro de conexão Socket:", err.message);
  });

  return socket;
}

export function getSocket() {
  if (!socket) throw new Error("Socket não inicializado. Chame initSocket primeiro.");
  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}
