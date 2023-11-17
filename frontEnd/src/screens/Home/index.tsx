import React, { Alert, Button, Dimensions, FlatList, Platform, SafeAreaView, StyleSheet, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { Feather } from "@expo/vector-icons";

import CalendarPicker from 'react-native-calendar-picker'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import {
  Container,
  CalloutContainer,
  Title,
  SubTitle,
  BottomSheetContainer,
  BottomSheetHeader,
  VerticalContainer,
  ImageBoat,
  TitleSheet,
  DescriptionBoat,
  BottomSheetBody,
  SubContainer,
  InputScheduling,
  ButtonConfirm,
  TitleButton,
  PaymentContainer,
  ButtonMoney,
  TitleInfos,
  Infos
} from './styles';

import theme from '../../global/styles/theme';
import { StatusBar } from 'expo-status-bar';
import { useState, useRef, useEffect } from 'react';

import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import api from '../../services/api';
import { useIsFocused } from '@react-navigation/native';
import { useAuth } from '../../hooks/AuthContext';

const { width, height } = Dimensions.get('window');

interface IBoats {
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

export function Home() {
  const [boats, setBoats] = useState<IBoats[]>([])
  const [selectedBoat, setSelectedBoat] = useState<IBoats | null>()
  const [latitude, setLatitude] = useState(-23.022871);
  const [longitude, setLongitude] = useState(-44.341997);
  const [latitudeDelta, setLatitudeDelta] = useState(0.025)
  const [longitudeDelta, setLongitudeDelta] = useState(0.025)
  const [dateSelected, setDateSelected] = useState('')
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([])

  const isFocused = useIsFocused()
  const { user } = useAuth()

  function loadInitialThings() {
    api.get('/boats').then(({ data }) => {
      setBoats(data)
    })

  }

  //Irá recarregar os barcos toda vez que essa página for aberta
  useEffect(() => {
    setUnavailableDates([])
    if (!isFocused) {
      bottomSheetRef.current?.close()
      setDateSelected('')
      setSelectedBoat(null)
    } else {
      loadInitialThings()
    }


  }, [isFocused])
  let a = 'teste'

  useEffect(() => {
    if (!selectedBoat) return;

    api.get(`/boats/orders/${selectedBoat.id}`).then(({ data: { data } }) => {

      if (data.length > 0) {

        let dataFormatted = data.map((m: { date_appointment: Date }) => m.date_appointment)
        dataFormatted.push(new Date())

        setUnavailableDates(dataFormatted)

      } else {

        setUnavailableDates([new Date()])

      }


    })
  }, [selectedBoat])
  const bottomSheetRef = useRef<BottomSheet>(null);

  async function Schedule() {
    if (!dateSelected && !selectedBoat) return Alert.alert('You should selecte a date and a boat')
    const { data } = await api.post('/orders', {
      price: selectedBoat?.price,
      date_appointment: dateSelected,
      total_people: selectedBoat?.total_people,
      status: "processing",
      user_id: user?.id,
      boat_id: selectedBoat?.id
    })
    if (data['message'] !== 'Order created succefully') return Alert.alert('Houve um erro ao cadastrar seu pedido!')

    bottomSheetRef.current?.close()

    Alert.alert('Cadastrado com sucesso!')

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <GooglePlacesAutocomplete
          placeholder='Pesquisar'
          fetchDetails={true}
          GooglePlacesSearchQuery={{
            rankby: "distance",
          }}
          onPress={(data, details = null) => {
            setLatitude(details?.geometry.location.lat!)
            setLongitude(details?.geometry.location.lng!)
            setLatitudeDelta(0.415)
            setLongitudeDelta(0.121)
          }}
          query={{
            key: `${process.env.GOOGLE_PLACES_SECRET}`,
            language: 'pt-BR',
            components: "country:br",
            location: `${latitude}, ${longitude}`
          }}
          styles={{
            container: { flex: 0, zIndex: 1, position: 'absolute', width: '100%', },
            textInputContainer: { flexDirection: 'row' },
            textInput: { backgroundColor: '#f2f2f2', flex: 1, height: 50, marginVertical: 70, marginHorizontal: 10 },
            listView: { marginHorizontal: 10 }
          }}
        />

        <MapView
          onPress={() => {

            setSelectedBoat(null)
            bottomSheetRef.current?.close()
            setDateSelected('')
          }}
          mapType={Platform.OS == "android" ? "hybrid" : "standard"}
          provider='google'
          style={styles.map}
          zoomEnabled={true}
          zoomControlEnabled={true}
          region={{
            /*            Aqui vamos realizar o filtro para buscar na área desejada, essa parte leva o cara direto para o local*/
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta
          }}
          loadingEnabled={true}
        >
          {/*Aqui aparece os barcos no mapa */}

          {boats && boats.map(boat => {

            return <Marker key={boat.id} coordinate={{
              latitude: Number(boat.latitude),
              longitude: Number(boat.longitude),
            }}
              image={boat.type == 'boat' ?
                require('../../assets/logo.png') :
                boat.type == 'schooner' ?
                  require('../../assets/schooner.png') :
                  require('../../assets/jetski.png')}
            >
              {/* Parte responsável por clicar no barco e aparecer as informações */}

              <Callout
                tooltip
                key={boat.id}
                onPress={() => {
                  setLatitude(Number(boat.latitude))
                  setLongitude(Number(boat.longitude))
                  setSelectedBoat(boat)
                  bottomSheetRef.current?.expand()
                }}>
                <CalloutContainer>
                  <Title>{boat.type.charAt(0).toUpperCase()}{boat.type.slice(1)}-{boat.model}</Title>
                  <Feather name='user' color={theme.colors.dark} size={14}>
                    <Title> {boat.user.full_name}</Title>
                  </Feather>
                  <Feather name='users' color={theme.colors.dark} size={14}>
                    <Title> {boat.total_people} pessoas</Title>
                  </Feather>
                  <Feather name='dollar-sign' color={theme.colors.dark} size={14}>
                    <Title> {boat.price}</Title>
                  </Feather>
                  <SubTitle>Clique para mais detalhes</SubTitle>
                </CalloutContainer>
              </Callout>
            </Marker>
          })}
        </MapView>

        {/* BottomSheet */}


        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={[1, height - 400]}>
          <BottomSheetScrollView>
            <BottomSheetContainer>
              <BottomSheetHeader>
                <ImageBoat source={{ uri: selectedBoat?.image_path }} />

                <VerticalContainer>
                  <TitleSheet>{selectedBoat?.model}</TitleSheet>
                  <DescriptionBoat>{selectedBoat?.description}</DescriptionBoat>
                </VerticalContainer>

              </BottomSheetHeader>

              <BottomSheetBody>
                <Feather name='map-pin' color={theme.colors.dark} size={14}>
                  <TitleInfos> Localização:</TitleInfos>
                </Feather>

                <SubContainer>
                  <Infos> Estado: {selectedBoat?.state}</Infos>
                  <Infos> Cidade: {selectedBoat?.city}</Infos>
                  <Infos> Rua: {selectedBoat?.street}</Infos>
                </SubContainer>

                <Feather name='info' color={theme.colors.dark} size={14}>
                  <TitleInfos> Informações:</TitleInfos>
                </Feather>

                <SubContainer>
                  <Infos> Dono: {selectedBoat?.user.full_name}</Infos>
                  {selectedBoat?.type === 'jetski' ? null : <Infos> Marinheiro: {selectedBoat?.sailor}</Infos>}
                  <Infos> Contato: {selectedBoat?.user.telefone}</Infos>
                  <Infos> Total de Pessoas: {selectedBoat?.total_people}</Infos>
                  <Infos> Custo: {selectedBoat?.price}</Infos>
                </SubContainer>

                <Feather name='clock' color={theme.colors.dark} size={14}>
                  <TitleInfos> Data do agendamento:</TitleInfos>
                </Feather>

                <CalendarPicker onDateChange={(date) => setDateSelected(date.toString())} disabledDates={unavailableDates} showDayStragglers={true} minDate={new Date()} todayBackgroundColor="#f2e6ff" />

                <Feather name='credit-card' color={theme.colors.dark} size={14}>
                  <TitleInfos> Método do pagamento:</TitleInfos>
                </Feather>

                <PaymentContainer>
                  <ButtonMoney>
                    <Feather name='dollar-sign' color={theme.colors.dark} size={25} />
                  </ButtonMoney>

                  <ButtonMoney>
                    <Feather name='credit-card' color={theme.colors.dark} size={25} />
                  </ButtonMoney>
                </PaymentContainer>

                <ButtonConfirm {...!dateSelected ? { style: { backgroundColor: "#9c9191" }, disabled: true } : null} onPress={() => Schedule()}>
                  <TitleButton>Agendar</TitleButton>
                </ButtonConfirm>

              </BottomSheetBody>

            </BottomSheetContainer>
          </BottomSheetScrollView>
        </BottomSheet>

      </Container >
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
})

export default Home;