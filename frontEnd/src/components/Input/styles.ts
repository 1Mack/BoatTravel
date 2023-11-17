import styled from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize'
import InputMask from "react-native-mask-input";
export const Container = styled.View`
  align-items: center;
  padding: ${RFValue(8)}px;
`;

export const InputStyle = styled(InputMask)`
  width: 100%;
  padding: ${RFValue(10)}px;
  font-size: ${RFValue(10)}px;
  height: ${RFValue(40)}px;
  background-color: #FFF;

  border: 1px;
  border-color: #012677;

  border-radius: ${RFValue(10)}px;
  
`;