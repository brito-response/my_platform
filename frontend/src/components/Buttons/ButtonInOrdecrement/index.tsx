import { ReactNode } from "react";
import clsx from "clsx";

type ButtonInOrdecrementProps = {
    children: ReactNode;
    fnClick: () => void;
} & React.ComponentProps<"button">;

export const ButtonInOrdecrement: React.FC<ButtonInOrdecrementProps> = ({ children, fnClick, className, ...props }) => {
    const styles = clsx("p-2 text-(--text-color) bg-(--bg-section-200) rounded-full transition hover:bg-gray-300", className);
    
    return (
        <button type="button" onClick={fnClick} className={styles} {...props}>
            {children}
        </button>
    );
};
