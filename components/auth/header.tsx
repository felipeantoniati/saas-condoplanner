"use client";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
      subsets: ["latin"],
      weight: ["600"],
})


interface HeaderProps {
      label: string;
}

export const Header = ({ label }: HeaderProps) => {
      return (
            <div className="w-full flex flex-col items-center justify-center gap-y-4 ">
                  <span className="w-20 h-20 bg-blue-700 rounded-full p-2 flex items-center justify-center">
                        <img src="/condoplanner.svg" className="w-14"/>
                  </span>
                  <h1 className={
                        cn(
                              "text-3xl font-semibold",
                              font.className
                        )
                  }>

                  </h1>
                  <p className="text-muted-foreground text-sm">
                        {label}
                  </p>
            </div>
      );
};