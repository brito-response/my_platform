import React, { JSX } from "react";
import clsx from "clsx";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HProps = {
    level?: HeadingLevel;
    children: React.ReactNode;
    className?: string;
};

export const HCustom: React.FC<HProps> = ({ level = 1, children, className }) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;

    // Estilos responsivos por nível (ajuste conforme sua identidade visual)
    const baseClasses = clsx("font-bold leading-tight tracking-tight break-words",
        {
            "text-4xl sm:text-5xl md:text-6xl": level === 1,
            "text-3xl sm:text-4xl md:text-5xl": level === 2,
            "text-2xl sm:text-3xl md:text-4xl": level === 3,
            "text-xl sm:text-2xl md:text-3xl": level === 4,
            "text-lg sm:text-xl md:text-2xl": level === 5,
            "text-base sm:text-lg md:text-xl": level === 6,
        },
        className
    );

    return <Tag className={baseClasses}>{children}</Tag>;
};
