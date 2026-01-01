"use client";
import { FormUpdateUser } from "@/forms";
import { SessionProvider } from "next-auth/react";

export const ContainerUpdateUser = () => {
    return (
        <SessionProvider>
            <div className="w-full min-h-screen ">
                <FormUpdateUser />
            </div>
        </SessionProvider>
    );
};