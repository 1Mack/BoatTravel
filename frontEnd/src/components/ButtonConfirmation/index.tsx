import React from 'react-native'
import { Container, ButtonStyle, Title } from './styles';

interface ButtonProps {
  title: string
}

export function ButtonConfirmation({ title }: ButtonProps) {
  return (
    <Container>
      <ButtonStyle>
        <Title>{title}</Title>
      </ButtonStyle>
    </Container>
  );
}

export default ButtonConfirmation;
