import styled from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
  width: 100%;
  align-items: center;
  padding: ${RFValue(8)}px;
`;

export const ButtonStyle = styled.TouchableOpacity`
  width: 90%;
  padding: ${RFValue(10)}px;
  height: ${RFValue(46)}px;
  background-color: #00B4FC;

  align-items: center;
  justify-content: center;

  border-radius: ${RFValue(10)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.title};
`;