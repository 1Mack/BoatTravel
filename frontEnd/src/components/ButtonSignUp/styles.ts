import styled from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
  width: 100%;
  align-items: center;
  padding: ${RFValue(8)}px;
`;

export const ButtonStyle = styled.TouchableOpacity`
  width: 50%;
  padding: ${RFValue(10)}px;
  font-size: ${RFValue(10)}px;
  height: ${RFValue(40)}px;

  align-items: center;
  justify-content: center;

  border: ${RFValue(1)}px;
  border-radius: ${RFValue(10)}px;
  border-color: #FFF;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.title};
`;