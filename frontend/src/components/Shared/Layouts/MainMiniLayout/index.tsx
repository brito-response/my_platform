type MainMiniLayoutProps = {
  children: React.ReactNode;
};

export const MainMiniLayout: React.FC<MainMiniLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col flex-wrap items-center justify-start gap-2.5 max-w-full">
      {children}
    </div>
  );
};