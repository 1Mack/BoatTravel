import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  padding: ${RFValue(10)}px;
`;

export const ContentHeader = styled.View`
  padding: ${RFValue(20)}px;
  margin-top: ${RFValue(40)}px;

  align-items: center;
  justify-content: center;
`;

export const ContentBody = styled.View`
  margin-Top: ${RFValue(15)}px;
`;

export const ContentFooter = styled.View`
  margin-top: ${RFValue(30)}px;
`;

export const LogoImg = styled.Image`
    width: ${RFValue(100)}px;
    height: ${RFValue(70)}px;;
`;

export const TitleCreateAccount = styled.Text`
  font-size: ${RFValue(20)}px;
  font-style: oblique;
  text-align: center;
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.title};
`;

export const ButtonSubmit = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: ${RFValue(10)}px;

  margin-top: ${RFValue(10)}px;
  margin-left: 10%;
  border-radius: ${RFValue(8)}px;
  background-color: ${({ theme }) => theme.colors.blue};
`

export const TitleButtonSubmit = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.title};
`;

export const InputForm = styled.TextInput`
  width: 100%;
  height: ${RFValue(50)}px;
  background-color: #f8f8f8;
  font-family: ${({ theme }) => theme.fonts.title};
  padding: ${RFValue(10)}px;
  border-radius: ${RFValue(8)}px;
  margin-bottom: ${RFValue(15)}px;
`;
