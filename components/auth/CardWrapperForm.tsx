"use client";

import { BackButtonForm } from "@/components/auth/BackButtonForm";
import { HeaderForm } from "@/components/auth/HeaderForm";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface CardWrapperProps {
      children: React.ReactNode;
      headerLabel: string;
      backButtonLabel: string;
      backButtonHref: string;
};

export const CardWrapper = ({
      children,
      headerLabel,
      backButtonLabel,
      backButtonHref,
}: CardWrapperProps) => {
      return (
            <Card className="w-[400px] bg-white shadow-xl">
                  <CardHeader>
                        <HeaderForm label={headerLabel} />
                  </CardHeader>

                  <CardContent>
                        {children}
                  </CardContent>

                  <CardFooter>
                        <BackButtonForm
                              href={backButtonHref}
                              label={backButtonLabel}
                        />
                  </CardFooter>
            </Card>
      );
};
