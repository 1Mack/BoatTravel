import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const ContentHeader = styled.View`
  padding-left: ${RFValue(20)}px;
  padding-right: ${RFValue(20)}px;
  margin-top: ${RFValue(50)}px;
`;

export const ContentBody = styled.View`
  flex: 1;
  width: 100%;
  padding: ${RFValue(20)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.title};
`;

export const Description = styled.Text`
  font-size: ${RFValue(14)}px;
  text-align: justify;
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${RFValue(2)}px;
  font-family: ${({ theme }) => theme.fonts.description};
`;

export const CardBackground = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${RFValue(14)}px;
  border-radius: ${RFValue(8)}px;
  margin-top: 10px;
  margin-bottom: 10px;

`;

export const ImageVessel = styled.Image`
  width: 150px;
  height: 100%;

  margin-bottom: ${RFValue(5)}px;

  border-radius: ${RFValue(5)}px;
`

export const NameModel = styled.Text`
  font-size: ${RFValue(18)}px;
  margin-bottom: ${RFValue(5)}px;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.title};
`;

export const SubModel = styled.Text`
  font-size: ${RFValue(14)}px;
  margin-top: ${RFValue(2)}px;
  margin-left: ${RFValue(5)}px;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.title};
`

export const Teste = styled.View`
  flex-direction: row;
  
`

export const Teste2 = styled.View`
  flex-direction: column;
  padding-left: 5px;
  
`

export const ButtonSchedule = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.bluedark};
  align-items: center;
  padding: ${RFValue(10)}px;
  margin-top: ${RFValue(10)}px;

  border-radius: ${RFValue(5)}px;
`

export const TitleButton = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.title};
`;










