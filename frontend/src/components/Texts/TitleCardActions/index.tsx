import { ReactNode } from "react";

type TitleCardActionsProps = { children: ReactNode; };

export const TitleCardActions: React.FC<TitleCardActionsProps> = ({ children }) => {
    return (
        <h2 className="text-(--text-color) text-lg font-semibold">{children}</h2>
    );
};

