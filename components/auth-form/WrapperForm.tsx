"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HeaderForm } from "@/components/auth-form/HeaderForm";

interface CardWrapperProps {
      children: React.ReactNode;
      headerLabel: React.ReactNode;
}

export const WrapperForm = ({ children, headerLabel }: CardWrapperProps) => {
      const controls = useAnimation();

      useEffect(() => {
            controls.start({
                  x: 0,
                  opacity: 1,
                  transition: { duration: 0.5 }
            });
      }, [controls]);

      return (
            <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={controls}
            >
                  <Card className="w-full customResponsiveSize:w-[400px] bg-white shadow-xl transition-all duration-300">
                        <CardHeader>
                              <HeaderForm label={headerLabel} />
                        </CardHeader>

                        <CardContent>
                              {children}
                        </CardContent>
                  </Card>
            </motion.div>
      );
};