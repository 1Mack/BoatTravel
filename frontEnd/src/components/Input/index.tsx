import { TextInputProps } from "react-native";
import { Container, InputStyle } from "./styles";

export function Input({ ...rest }: TextInputProps) {
  return (
    <Container>
      <InputStyle {...rest} />
    </Container>
  );
}