import React, { Alert, SafeAreaView } from 'react-native';

import {
  Container,
  ContentHeader,
  ContentBody,
  Title,
  Description,
  CardBackground,
  NameModel,
  SubModel,
  ImageVessel,
  ButtonSchedule,
  TitleButton,
  Teste,
  Teste2
} from './styles';

import { Background } from '../../components/Background';
import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../hooks/AuthContext';
import dayjs from 'dayjs'
import { Feather, AntDesign, Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import theme from '../../global/styles/theme';

interface Orders {
  id: string
  price: number
  date_appointment: string
  total_people: number
  status: string
  created_at: Date
  user: {
    full_name: string
  }
  boat: {
    id: string;
    type: string;
    model: string;
    state: string;
    city: string;
    street: string;
    latitude: string;
    longitude: string;
    sailor: string;
    total_people: string;
    price: number;
    unique_id: string;
    description: string;
    image_path: string;
    user: {
      full_name: string;
      email: string;
      telefone: string;
    }
  }
}

export function Orders() {
  const [orders, setOrders] = useState<Orders[]>([])
  const { user } = useAuth()

  const isFocused = useIsFocused()

  async function loadOrders() {


    if (user) {
      //reveri sso aqui
      api.get(`/orders/${user.id}`).then(({ data }) => {

        setOrders(data.orders)
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

  function handleButton(order: Orders) {
    if (order.status === 'processing') {
      Alert.alert('Tem certeza que quer cancelar ?', undefined, [{ style: 'cancel', text: 'NÃO' }, {
        style: 'destructive', text: 'SIM', onPress: () => {
          api.put(`/orders/${order.id}`, {
            status: 'canceled'
          })

        }
      }])
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Background>
        <Container>
          <ContentHeader>
            <Title>Histórico de Atividades</Title>
          </ContentHeader>

          <ContentBody>
            {orders &&

              <FlatList
                scrollEnabled={true}
                data={orders}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <CardBackground>
                    <NameModel>{item.boat.type.charAt(0).toUpperCase()}{item.boat.type.slice(1)} - {item.boat.model}</NameModel>
                    <Teste>
                      <ImageVessel source={{ uri: item.boat.image_path }} />
                      <Teste2>

                        <Octicons name='person' color={theme.colors.blue} size={14}>
                          <SubModel>{item.boat.user.full_name}</SubModel>
                        </Octicons>

                        <MaterialCommunityIcons name='list-status' color={theme.colors.blue} size={14}>
                          <SubModel>{item.status}</SubModel>
                        </MaterialCommunityIcons>

                        <Feather name='map-pin' color={theme.colors.blue} size={14}>
                          <SubModel>{item.boat.city}</SubModel>
                        </Feather>

                        <Feather name='dollar-sign' color={theme.colors.blue} size={14}>
                          <SubModel>{item.price}</SubModel>
                        </Feather>

                        <AntDesign name='calendar' color={theme.colors.blue} size={14}>
                          <SubModel>{dayjs(item.date_appointment.substring(0, item.date_appointment.indexOf('T'))).format('DD/MM/YYYY')}</SubModel>
                        </AntDesign>
                      </Teste2>
                    </Teste>
                    <ButtonSchedule {...item.status == 'processing' ? { style: { backgroundColor: '#ed1818' } } : null} onPress={() => handleButton(item)}>
                      <TitleButton>{item.status == 'processing' ? 'Cancelar' : 'Agendar Novamente'}</TitleButton>
                    </ButtonSchedule>
                  </CardBackground>

                )}
              />
            }
          </ContentBody>
        </Container>
      </Background>
    </SafeAreaView>
  );
}

export default Orders;