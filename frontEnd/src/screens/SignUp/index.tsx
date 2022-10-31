import { Text, View, TextInput, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/auth.routes";
import { useForm, Controller } from "react-hook-form";
import { Input } from '../../components/Input/index';
import { Background } from "../../components/Background";
import Logo from '../../assets/logo.png'
import api from "../../services/api";
import { Title } from "../Login/styles";


import { ButtonSignUp } from '../../components/ButtonSignUp';

import {
  Container,
  ContentHeader,
  ContentFooter,
  LogoImg,
  ButtonSubmit,
  TitleButtonSubmit
} from './styles';


interface FormInfos {
  full_name: string;
  telefone: string;
  age: number;
  email: string;
  cpf: string;
  password: string;
}
type loginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

export function SignUp() {
  const navigation = useNavigation<loginScreenProp>()

  const { control, handleSubmit, formState: { errors } } = useForm();

  async function onSubmit(infos: FormInfos) {
    infos.age = Number(infos.age)
    const { data } = await api.post('/users', infos)
    if (!data['errors']) {
      navigation.navigate('Login')
    }
  }

  return (
    <Background>
      <Container>
        <ContentHeader>
          <LogoImg source={Logo} />
          <Title>Cadastre-se</Title>
        </ContentHeader>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (

            <Input onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize='words'
             
              placeholder="Nome Completo"
              placeholderTextColor='grey'
            >
            </Input>
          )}
          name="full_name"
        />
        {errors.full_name && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType='email-address'
              autoCapitalize="none"
              placeholder="Email"
              placeholderTextColor='grey'
            >

            </Input>

          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType='number-pad'
              placeholder="Telefone"
              placeholderTextColor='grey'
            >

            </Input>

          )}
          name="telefone"
        />
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType='number-pad'
              placeholder="Idade"
              placeholderTextColor='grey'
            >

            </Input>

          )}
          name="age"
        />
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType='number-pad'
              placeholder="CPF"
              placeholderTextColor='grey'
            >

            </Input>

          )}
          name="cpf"
        />
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Senha"
              placeholderTextColor='grey'
            >

            </Input>

          )}
          name="password"
        />
        <ButtonSubmit onPress={handleSubmit(onSubmit)}>
          <TitleButtonSubmit>Cadastrar</TitleButtonSubmit>
        </ButtonSubmit>
        <ContentFooter>
          <ButtonSignUp title='Entrar' onPress={() => navigation.navigate('Login')
          } />
        </ContentFooter>
      </Container>
    </Background >
  );
}

export default SignUp;