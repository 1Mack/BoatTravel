import React, { Alert, SafeAreaView } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/core';

import Logo from '../../assets/logo.png'
import { ButtonSignUp } from '../../components/ButtonSignUp';
import { Input } from '../../components/Input/index';

import {
  Container,
  ContentHeader,
  ContentBody,
  ContentFooter,
  LogoImg,
  Title,
  Description,
  ForgotPassword,
  ButtonLogin,
  TitleButton,
  InputLogin
} from './styles';
import { Background } from '../../components/Background';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/auth.routes';
import { useAuth } from '../../hooks/AuthContext';
import { useState } from 'react';
import api from '../../services/api';

type loginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUserAuth } = useAuth()

  const navigation = useNavigation<loginScreenProp>()

  async function handleLogin() {
    const { data } = await api.post('/sessions', { email, password })

    if (data['message']) return Alert.alert('Erro no Login', 'Combinação de Email/Senha errados')

    setUserAuth({ id: data.user.id, email, token: data.token })

  }

  return (
    <Background>
      <SafeAreaView>
        <Container>
          <ContentHeader>
            <LogoImg source={Logo} />
            <Title>Alugue um Barco</Title>
            <Description>Encontre a melhor navegação para a sua viagem ou passeio</Description>
          </ContentHeader>

          <ContentBody>
            <InputLogin
              keyboardType='email-address'
              autoCapitalize="none"
              placeholder='Email'
              onChangeText={(value) => setEmail(value)}
            />

            <InputLogin
              placeholder='Senha'
              onChangeText={(value) => setPassword(value)}
              secureTextEntry={true}
            />

            <ButtonLogin onPress={handleLogin}>
              <TitleButton>Entrar</TitleButton>
            </ButtonLogin>
            <ForgotPassword>Esqueceu a senha?</ForgotPassword>
          </ContentBody>

          <ContentFooter>
            <ButtonSignUp title='Cadastrar' onPress={() => navigation.navigate('SignUp')} />
          </ContentFooter>
        </Container>
      </SafeAreaView>
    </Background>
  );
}

export default Login;