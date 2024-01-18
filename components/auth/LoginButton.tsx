"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
      children: React.ReactNode;
      mode?: "modal" | "redirect";
      asChild?: boolean;
};

export const LoginButton = ({ children, mode = "redirect", }: LoginButtonProps) => {
      const router = useRouter();

      const handleOnClick = () => router.push("/auth/login");

      if (mode === "modal") {
            return (
                  <span>
                        Open Modal
                  </span>
            );
      };

      return (
            <span
                  className="cursor-pointer"
                  onClick={handleOnClick}
            >
                  {children}
            </span>
      );
};