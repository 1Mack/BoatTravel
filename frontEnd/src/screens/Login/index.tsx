//import env from 'react-native-dotenv'
import React, { ActivityIndicator, Alert, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
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
  const [loadLogin, setLoadLogin] = useState(false)

  const { setUserAuth } = useAuth()

  const navigation = useNavigation<loginScreenProp>()

  async function handleLogin() {
    setLoadLogin(true)
    const response = await api.post('/sessions', { email, password }).catch(m => undefined)

    if (!response) {
      setLoadLogin(true)
      return Alert.alert('Erro Interno')
    }

    if (response.data['message']) {
      setLoadLogin(true)
      return Alert.alert('Erro no Login', 'Combinação de Email/Senha errados')
    }

    setUserAuth({ id: response.data.user.id, email, token: response.data.token })

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
              editable={!loadLogin}
              keyboardType='email-address'
              autoCapitalize="none"
              placeholder='Email'
              onChangeText={setEmail}
            />

            <InputLogin
              editable={!loadLogin}
              placeholder='Senha'
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            <ButtonLogin disabled={loadLogin} onPress={handleLogin} >
              <TitleButton>{loadLogin ? <ActivityIndicator color={'#FFF'} /> : 'Entrar'}</TitleButton>
            </ButtonLogin>
            <ForgotPassword>Esqueceu a senha?</ForgotPassword>
          </ContentBody>

          <ContentFooter>
            <ButtonSignUp disabled={loadLogin} style={{ opacity: loadLogin ? 0.5 : 1 }} title='Cadastrar' onPress={() => navigation.navigate('SignUp')} />
          </ContentFooter>
        </Container>
      </SafeAreaView>
    </Background>
  );
}

export default Login;