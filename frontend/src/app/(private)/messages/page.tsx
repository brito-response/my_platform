import { cookies } from "next/headers";
import { ChatSidebar, ChatWindow } from "@/components/Chat";
import User from "@/utils/data_types/users";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export interface DataCustom { token: string | null; users: User[]; };

async function getUsers(): Promise<DataCustom> {
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt_back');
  let jwt = !token ? "not found" : token.value;
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return { token: jwt, users: await response.json() } as DataCustom;
    }
    return { token: null, users: [] } as DataCustom;
  } catch (error) {
    throw new Error("Erro ao conectar no backend.");
  }
}

export default async function Message() {
  const { token, users } = await getUsers();
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full min-h-screen bg-(--bg-section-100) p-10">
      <ChatSidebar users={users} token={token ?? ""} tokenTwo={(session?.user as any)?.id ?? ""} />
      <ChatWindow />
    </div>
  );
} 