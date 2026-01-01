import clsx from "clsx";
type LoaderProps = { size?: "sm" | "md" | "lg"; text?: string; centered?: boolean; };

const sizeMap = { sm: "w-6 h-6 border-2", md: "w-10 h-10 border-4", lg: "w-16 h-16 border-4" };

export const Loader: React.FC<LoaderProps> = ({ size = "md", text = "Carregando", centered = true }) => {
  return (
    <div className={clsx("flex items-center gap-3", centered && "justify-center w-full py-4")} role="status" aria-live="polite">
      <div className={clsx("rounded-full border-solid border-t-green-500 border-green-500/20 animate-spin", sizeMap[size])}></div>
      {text && (
        <div className="text-green-500 font-semibold tracking-wide text-base">
          {text}
        </div>
      )}
    </div>
  );
};
