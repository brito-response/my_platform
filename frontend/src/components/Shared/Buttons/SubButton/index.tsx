type SubButtonProps = {
  label: string;
  type?: "reset" | "submit" | "button";
} & React.ComponentProps<"button">;

export const SubButton: React.FC<SubButtonProps> = ({ label, type = "submit", className = "", ...props}) => {
  return (
    <button type={type} className={`max-h-7 px-6 py-1 bg-(--brand-300) text-white font-bold text-md rounded-md flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-(--brand-400) lg:w-auto w-full mt-5 lg:mt-0 ${className}`}
      {...props}>
      {label}
    </button>
  );
};
