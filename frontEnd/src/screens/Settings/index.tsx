import React, { SafeAreaView, StyleSheet } from 'react-native';
import { Feather, Octicons, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import {
  Container,
  ContentHeader,
  ContentBody,
  ContentFooter,
  LogOut,
  InputForm,
  Title,
  LabelInput,
  ContainerImage,
  ProfileImage,
  ImageBox,
  ButtonUpdate,
  TitleButtonUpdate
} from './styles';
import { Background } from '../../components/Background';
import theme from '../../global/styles/theme';
import { ButtonLogin } from '../Login/styles';
import { RootStackParamList } from '../../routes/auth.routes';

import { useAuth } from '../../hooks/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useIsFocused } from '@react-navigation/native';
import IconProfile from '../../assets/icon.png'

interface IUser {
  id: string
  full_name: string;
  email: string;
  telefone: string;
}


export function Settings() {
  const [userState, setUserState] = useState<IUser>()
  const isFocused = useIsFocused()

  const { deleteUserAuth, user } = useAuth()

  async function handleLogout() {

    await deleteUserAuth()


  }



  async function loadOrders() {


    if (user) {
      //reveri sso aqui
      api.get(`/users/${user.id}`).then(({ data }) => {

        setUserState(data.data)
      })
    }

  }

  useEffect(() => {
    loadOrders()
  }, [])

  //Irá recarregar os barcos toda vez que essa página for aberta
  useEffect(() => {
    if (!isFocused) return;
    loadOrders()
  }, [isFocused])

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Background>
          <Container>
            <ContentHeader>
              <Title>Meu Perfil</Title>
              <LogOut>
                <Feather size={25} color={theme.colors.white} name="log-out" onPress={handleLogout}>
                </Feather>
              </LogOut>
            </ContentHeader>

            <ContentBody>

              <ContainerImage>
                <ProfileImage style={styles.image}>
                  <ImageBox source={IconProfile} />
                </ProfileImage>
              </ContainerImage>

              <LabelInput>Nome</LabelInput>
              <InputForm >
                <Octicons name='person' size={15} color={theme.colors.blue} /> {userState?.full_name}
              </InputForm>

              <LabelInput>Email</LabelInput>
              <InputForm >
                <MaterialCommunityIcons name="email-outline" size={15} color={theme.colors.blue} /> {userState?.email}
              </InputForm>

              <LabelInput>Telefone</LabelInput>
              <InputForm>
                <Feather name='phone' size={15} color={theme.colors.blue} /> {userState?.telefone}
              </InputForm>

              <ButtonUpdate>
                <TitleButtonUpdate>Salvar Alterações</TitleButtonUpdate>
              </ButtonUpdate>

            </ContentBody>

          </Container>
        </Background>
      </SafeAreaView>
    </>
  );
}

export default Settings;

const styles = StyleSheet.create({
  image: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 15,
  }
})