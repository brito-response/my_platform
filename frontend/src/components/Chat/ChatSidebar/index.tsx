"use client";

import { useState } from "react";
import { ChatPopup } from "../ChatPopup.tsx";
import User from "@/utils/data_types/users";

type ChatSidebarProps = { token: string; tokenTwo: string; users: User[]; };

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ token, tokenTwo, users }) => {
  const [openChatId, setOpenChatId] = useState<string | null>(null);

  const selectedUser = users.find((user) => user.userId === openChatId);
  return (
    <aside className="w-1/3 border-r bg-white p-4 overflow-y-auto">
      <h1 className="text-xl font-semibold mb-4">Contatos</h1>
      <ul className="space-y-3">
        {Array.isArray(users) && users.map((user: User) => (
          <li key={user.userId} onClick={() => setOpenChatId(user.userId)} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-gray-100 transition">
            <img src={(`http://localhost:3000` + user.photo) || "/images/default-avatar.png"} alt={user.name} className="w-10 h-10 rounded-full" />
            <div>
              <h2 className="font-medium">{user.name}</h2>
              <p className="text-xs text-gray-500">Clique para conversar</p>
            </div>
          </li>
        ))}
      </ul>

      {openChatId && selectedUser && (<ChatPopup userId={openChatId} userName={selectedUser.name} currentUserId={tokenTwo} token={token} onClose={() => setOpenChatId(null)} />
      )}
    </aside>
  );
}
