"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
      href: string;
      label: string;

}

export const BackButton = ({ href, label }: BackButtonProps) => {
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
      )
}