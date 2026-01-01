
type ButtonRoundedProps = {} & React.ComponentProps<"button">;

export const ButtonRounded: React.FC<ButtonRoundedProps> = ({ ...props }) => {
    return (
    <button {...props}>
        <h3>ButtonRounded</h3>
    </button>);
}