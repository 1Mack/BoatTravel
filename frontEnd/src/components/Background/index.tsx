import React, { ReactNode } from "react";
import { Container } from "./styles";

interface Props {
  children: ReactNode;
}

export function Background({ children }: Props) {
  return (
    <Container
      colors={["#005BC5", "#005BC5", "#00B4FC"]}
    >

      {children}
    </Container>
  );
}