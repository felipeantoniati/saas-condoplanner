"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export const Social = () => {
      return (
            <div className="flex items-center w-full gap-x-2">
                  <Button
                        size={"lg"}
                        className="w-full flex gap-2 font-semibold tracking-wider border-2 hover:shadow-md hover:bg-white"
                        variant={"outline"}
                        onClick={() => { }}
                  >
                        <FcGoogle className="w-5 h-5" />
                        Google
                  </Button>
            </div>
      );
};