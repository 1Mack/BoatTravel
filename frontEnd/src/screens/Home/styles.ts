import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  align-items:center;
`;

export const CalloutContainer = styled.View`
  flex: 1;
  height: 100%;
  padding: ${RFValue(10)}px;
  border-radius: ${RFValue(5)}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Title = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.bluedark};
  font-family: ${({ theme }) => theme.fonts.title};
`;

export const SubTitle = styled.Text`
  margin-top: ${RFValue(2)}px;
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.blue};
  font-family: ${({ theme }) => theme.fonts.title};
`;

export const BottomSheetContainer = styled.View`
  flex: 1;
  width: 100%;
`

export const BottomSheetHeader = styled.View`
  width: 100%;
  flex-direction: row;

  margin-top: ${RFValue(10)}px;
  padding-left: ${RFValue(20)}px;
  padding-right: ${RFValue(20)}px;
`

export const VerticalContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
`

export const ImageBoat = styled.Image`
  flex: 1;
  width: 50%;
  height: ${RFPercentage(20)}px;

  border-radius: ${RFValue(10)}px;
`

export const TitleSheet = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.bluedark};
  font-family: ${({ theme }) => theme.fonts.title};
  align-self: flex-start;

  margin-left: ${RFValue(5)}px;
`;

export const DescriptionBoat = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.bluedark};
  font-family: ${({ theme }) => theme.fonts.description};
  align-self: flex-start;

  text-align: justify;

  margin-top: ${RFValue(2)}px;
  margin-left: ${RFValue(5)}px;
`

export const BottomSheetBody = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};

  margin-top: ${RFValue(10)}px;

  padding-left: ${RFValue(20)}px;
  padding-right: ${RFValue(20)}px;
  padding-bottom: ${RFValue(20)}px;
`

export const TitleInfos = styled.TextInput`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.dark};
  font-family: ${({theme}) => theme.fonts.title};
`;

export const Infos = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({theme}) => theme.colors.black};
  font-family: ${({theme}) => theme.fonts.description};
`;

export const SubContainer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.grey};
  border-radius: ${RFValue(10)}px;

  margin-top: ${RFValue(2)}px;
  margin-bottom: ${RFValue(10)}px;
  padding: ${RFValue(5)}px;
`

export const InputScheduling = styled.TextInput`
  width: 100%;
  background-color: ${({theme}) => theme.colors.grey};
  font-family: ${({ theme }) => theme.fonts.description};

  padding: ${RFValue(8)}px;
  margin-top: ${RFValue(2)}px;
  margin-bottom: ${RFValue(10)}px;

  border-radius: ${RFValue(5)}px;
`;

export const PaymentContainer = styled.View`
  flex: 1;
  flex-direction: row;
`

export const ButtonMoney = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.white};
  align-items: center;

  padding: ${RFValue(10)}px;
  margin-top: ${RFValue(2)}px;
  margin-left: ${RFValue(5)}px;
  margin-right: ${RFValue(5)}px;

  border-radius: ${RFValue(5)}px;
  border: 1px;
  border-color: ${({theme}) => theme.colors.bluedark};
`

export const ButtonConfirm = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.bluedark};
  align-items: center;
  padding: ${RFValue(10)}px;
  margin-top: ${RFValue(10)}px;

  border-radius: ${RFValue(5)}px;
`

export const TitleButton = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.white};
  font-family: ${({theme}) => theme.fonts.title};
`;












