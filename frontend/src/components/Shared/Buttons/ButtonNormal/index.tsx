"use client";

import React from "react";
import { useRouter } from "next/navigation";

type ButtonNormalProps = {
    textLabel?: string;
    link?: string;
} & React.ComponentProps<"button">;

export const ButtonNormal: React.FC<ButtonNormalProps> = ({ textLabel = "Save", link = "/", ...props }) => {
    const router = useRouter();

    const fnClick = () => router.push(link);

    return (
        <button onClick={fnClick} {...props}
            className=" bg-(--brand-400) px-5 py-1 rounded-md transition-all duration-150 hover:bg-(--brand-500) hover:shadow-md active:scale-95 focus:outline-none">
            <span className="text-amber-50 font-bold">{textLabel}</span>
        </button>
    );
};
