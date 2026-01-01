"use client";
import React, { useEffect, useState, useRef } from "react";
import { initSocket, getSocket, disconnectSocket } from "@/lib/socket";
import { X } from "lucide-react";
import clsx from "clsx";

interface Message {
  messageId?: string;
  senderId: string;  // usuário logado (senderId)
  receiverId: string;  // destinatário (receiverId)
  content: string;
  createdAt?: string;
}

type ChatPopupProps = { userId: string; userName: string; currentUserId: string; token: string; onClose: () => void; };

export const ChatPopup: React.FC<ChatPopupProps> = ({ userId, userName, currentUserId, token, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = initSocket(token);
    socket.connect();

    // registrar usuário
    socket.emit("registerUser", { userId: currentUserId });

    // carregar histórico inicial via REST
    fetch(`http://localhost:3000/messages/conversation/${currentUserId}/${userId}`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()).then((data) => setMessages(data || []));

    // quando o servidor enviar uma conversa atualizada
    socket.on("conversationUpdated", (conversation: Message[]) => {
      // garante que é a conversa atual
      const isRelevant = conversation.some((msg) => (msg.senderId === currentUserId && msg.receiverId === userId) || (msg.senderId === userId && msg.receiverId === currentUserId));
      if (isRelevant) setMessages(conversation);
    });

    return () => {
      socket.off("conversationUpdated");
      disconnectSocket();
    };
  }, [userId, currentUserId, token]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;
    const socket = getSocket();
    socket.emit("sendMessage", {
      senderId: currentUserId,
      receiverId: userId,
      content: text,
    });
    setText("");
  };


  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden border">
      <div className="flex items-center justify-between bg-green-600 text-white p-3">
        <h2 className="font-semibold">Chat com Usuário {userName}</h2>
        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
        {messages.map((m) => (
          <div key={m.messageId || Math.random()} className={clsx("flex", m.senderId === currentUserId ? "justify-end" : "justify-start")}>
            <div className={clsx("px-3 py-2 rounded-xl text-sm max-w-[75%]", m.senderId === currentUserId ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800")}>
              {m.content}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div className="flex items-center gap-2 p-3 border-t">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Digite..." className="flex-1 border rounded-xl p-2 text-sm" />
        <button onClick={sendMessage} className="bg-green-500 text-white px-3 py-2 rounded-xl text-sm">
          Enviar
        </button>
      </div>
    </div>
  );
}
