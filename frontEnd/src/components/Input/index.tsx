import { MaskInputProps } from 'react-native-mask-input'
import { Container, InputStyle } from "./styles";

export function Input({ ...rest }: MaskInputProps) {
  return (
    <Container>
      <InputStyle {...rest} />
    </Container>
  );
}