type ParagraphProps = {
    children: React.ReactNode;
} & React.ComponentProps<'p'>;

export const Paragraph: React.FC<ParagraphProps> = ({ children, ...props }) => {
    return (
        <p className={`text-gray-700 text-sm font-light text-justify md:text-left leading-relaxed wrap-break-word`} {...props}>
            {children}
        </p>
    );
};