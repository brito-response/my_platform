"use client";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

type ButtonCreateProps = {
    link?: string;
} & React.ComponentProps<'button'>;

export const ButtonView: React.FC<ButtonCreateProps> = ({ link = "/", ...props }) => {
    const route = useRouter();
    const handleClick = () => {
        route.push(link);
    };

    return (
        <button className={`flex items-center justify-center gap-2 bg-amber-500 text-white font-semibold py-2 px-4 rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_10px_rgba(0,0,0,0.3)] active:translate-y-0.5 active:shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out`} onClick={handleClick} {...props}>
            <Eye size={18} /> Ver todos
        </button>
    );
};