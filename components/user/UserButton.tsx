"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback, } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/current-user-client-side";
import { handleLogoutSession } from "@/utils/database-operations/logout-session";
import { BsBoxArrowInLeft, BsBoxArrowLeft, BsPerson, BsPersonGear } from "react-icons/bs";
import Link from "next/link";

export const UserButton = () => {
      const user = useCurrentUser();
      const handleClickUserButton = () => handleLogoutSession();

      return (
            <DropdownMenu>
                  <div className="flex flex-col items-center gap-2 tracking-wider bg-slate-800 p-4 rounded-md">
                        <DropdownMenuTrigger>
                              <Avatar className="w-20 h-20">
                                    <AvatarImage src={user?.image || ""} />
                                    <AvatarFallback className="bg-blue-500">
                                          <BsPerson size={24} className="text-white" />
                                    </AvatarFallback>
                              </Avatar>
                        </DropdownMenuTrigger>
                        <h1 className="text-center flex flex-col">
                              <span className="text-slate-300 font-bold tracking-wider">
                                    Logado com e-mail:
                              </span>
                              <span className="text-slate-400">
                                    {user?.email}
                              </span>
                        </h1>

                  </div>

                  <DropdownMenuContent className="p-2 space-y-2">
                        <DropdownMenuItem className="w-full">
                              <Link
                                    href={"/users/settings"}
                                    className="w-full cursor-pointer flex items-center gap-2"
                              >
                                    <BsPersonGear size={22} />
                                    Configurações de Perfil
                              </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="w-full">
                              <span onClick={handleClickUserButton} className="w-full cursor-pointer flex items-center gap-2">
                                    <BsBoxArrowInLeft size={22} />
                                    Logout / Sair
                              </span>
                        </DropdownMenuItem>
                  </DropdownMenuContent>
            </DropdownMenu>
      );
};