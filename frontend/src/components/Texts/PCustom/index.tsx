import clsx from "clsx";

type HProps = {
    children: React.ReactNode;
    className?: string;
};

export const PCustom: React.FC<HProps> = ({ children, className }) => {
    const baseClasses = clsx("lg:px-24 text-lg leading-relaxed", className);
    return <p className={`text-(--text-paragraph) ${baseClasses}`}>{children}</p>;
};
