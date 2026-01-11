"use client";

import User from "@/utils/data_types/users";
import { User2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type InfoLinkProfileProps = { userId: string; };

export const InfoLinkProfile: React.FC<InfoLinkProfileProps> = ({ userId }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/getdata/${userId}`, { method: "POST" });
                if (!response.ok) return;
                const data: User = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Erro ao buscar usuário", error);
            }
        })();
    }, [userId]);

    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <User2Icon className="w-7 h-7 text-gray-300" />
                <span className="text-gray-300 text-sm">Carregando...</span>
            </div>
        );
    }

    return (
        <div className="flex flex-row gap-x-4 items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-slate-200">
                {user.photo ? (
                    <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${user.photo}`} width={40} height={40} alt="Foto do perfil do usuário" unoptimized className="object-cover object-center"/>
                ) : (
                    <User2Icon className="w-10 h-10 text-gray-400" />
                )}
            </div>

            <p className="text-lg font-extralight">@{user.name}</p>
        </div>
    );

};
