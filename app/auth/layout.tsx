const AuthLayout = ({ children, }: { children: React.ReactNode }) => {
      return (
            <main className="h-full flex flex-col items-center justify-center gap-5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">
                  {children}
            </main>
      );
};

export default AuthLayout;