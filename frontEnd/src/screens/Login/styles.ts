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
  justify-content: center;
  align-items: center;
  margin-top: ${RFValue(50)}px;
`;

export const ContentFooter = styled.View`
  margin-top: ${RFValue(30)}px;
`;

export const LogoImg = styled.Image`
    width: ${RFValue(100)}px;
    height: ${RFValue(70)}px;;
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.title};
`;

export const Description = styled.Text`
  font-size: ${RFValue(12)}px;
  font-style: italic;
  text-align: center;
  color: #fff;
  margin-top: ${RFValue(2)}px;
  font-family: ${({ theme }) => theme.fonts.description};
`;

export const ButtonLogin = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.blue};
  width: 80%;
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

export const ForgotPassword = styled.Text`
  font-size: ${RFValue(12)}px;
  font-style: italic;
  text-align: center;
  color: #fff;
  margin-top: ${RFValue(5)}px;
  font-family: ${({ theme }) => theme.fonts.description};
`;


export const ButtonSignUp = styled.TouchableOpacity`
  font-size: ${RFValue(12)}px;
  font-style: italic;
  text-align: center;
  color: #fff;
  margin-top: ${RFValue(2)}px;
  font-family: ${({ theme }) => theme.fonts.description};
`;

export const InputLogin = styled.TextInput`
  width: 80%;
  background-color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.title};
  padding: ${RFValue(5)}px;

  margin-bottom: ${RFValue(10)}px;

  border-radius: ${RFValue(5)}px;
`;




