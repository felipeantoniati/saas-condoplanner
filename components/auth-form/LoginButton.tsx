"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SyncLoader } from "react-spinners";

export const LoginButton = ({ children, }: { children: React.ReactNode }) => {
      const [activeSpinner, setActiveSpinner] = useState<boolean>(false);

      const router = useRouter();

      const handleOnClick = () => {
            setActiveSpinner(!activeSpinner);
            router.push("/auth/login");
      };

      if (activeSpinner) {
            return (
                  <div className="w-full p-3 flex justify-center ">
                        <SyncLoader size={12} color="#1D4ED8" />
                  </div>
            );
      } else {
            return (
                  <span onClick={handleOnClick} className="cursor-pointer" >
                        {children}
                  </span>
            );
      };
};