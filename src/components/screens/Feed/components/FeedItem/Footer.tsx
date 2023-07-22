import React from "react";
import { HStack } from "@components/common/Gluestack";

interface Props {
  children: React.ReactNode;
}

export function Footer({ children }: Props) {
  return (
    <HStack mx={4} alignItems="center" mb={3} mt={1}>
      {children}
    </HStack>
  );
}
