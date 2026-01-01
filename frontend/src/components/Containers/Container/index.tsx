type ContainerProps = {
    bgColor?: string;
    children: React.ReactNode;
} & React.ComponentProps<'div'>;

export const Container: React.FC<ContainerProps> = ({ bgColor = "bg-gray-100", children, ...props }) => {
    return (
        <div className={`w-full min-h-screen flex flex-col items-center ${bgColor} p-10`} {...props}>
            {children}
        </div>
    );
};