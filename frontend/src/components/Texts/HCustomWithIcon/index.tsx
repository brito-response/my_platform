import React, { JSX } from "react";
import clsx from "clsx";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HCustomWithIconProps = {
    level?: HeadingLevel;
    children: React.ReactNode;
    className?: string;
};

export const HCustomWithIcon: React.FC<HCustomWithIconProps> = ({ level = 1, children, className }) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    const baseClasses = clsx("text-black font-bold mb-6 flex items-center gap-2 leading-tight tracking-tight break-words",
        {
            "text-3xl sm:text-4xl md:text-5xl": level === 1,
            "text-2xl sm:text-3xl md:text-4xl": level === 2,
            "text-xl sm:text-2xl md:text-3xl": level === 3,
            "text-lg sm:text-xl md:text-2xl": level === 4,
            "text-base sm:text-lg md:text-xl": level === 5,
            "text-sm sm:text-base md:text-lg": level === 6,
        },
        className
    );

    return <Tag className={baseClasses}>{children}</Tag>;
};
