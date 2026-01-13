import { ReactNode } from "react";

type TextCardActionsProps = { children: ReactNode; };

export const TextCardActions: React.FC<TextCardActionsProps> = ({ children }) => {
    return (
        <h2 className="text-(--text-info) text-sm mt-1">{children}</h2>
    );
};

