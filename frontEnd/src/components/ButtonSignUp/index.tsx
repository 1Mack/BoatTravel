import React, { TouchableOpacityProps } from 'react-native'
import { Container, ButtonStyle, Title } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string
}

export function ButtonSignUp({ title, ...rest }: ButtonProps) {
  return (
    <Container>
      <ButtonStyle {...rest}>
        <Title>{title}</Title>
      </ButtonStyle>
    </Container>
  );
}

export default ButtonSignUp;
