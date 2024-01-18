"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
      href: string;
      label: string;
};

export const BackButtonForm = ({ href, label }: BackButtonProps) => {
      return (
            <Button
                  variant={"link"}
                  className="font-semibold text-sm underline w-full"
                  size={"sm"}
                  asChild
            >
                  <Link href={href}>
                        {label}
                  </Link>
            </Button>
      );
};
