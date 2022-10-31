import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
`;

export const ContentHeader = styled.View`
  padding-left: ${RFValue(20)}px;
  padding-right: ${RFValue(20)}px;
  margin-top: ${RFValue(50)}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.title};
`;

export const LogOut = styled.TouchableOpacity`
`;

export const ContentBody = styled.View`
  flex-direction: column;
  padding: ${RFValue(20)}px;
  margin-top: ${RFValue(20)}px;
`;

export const ContainerImage = styled.View`
  margin-bottom: ${RFValue(20)}px;
  align-self: center;

`

export const ProfileImage = styled.View`
  width: ${RFValue(150)}px;
  height: ${RFValue(150)}px;
  border-radius: 80px;
  overflow: hidden;
  box-shadow: rgba(0,0,0,0.2) 3px 3px 20px;
`

export const ImageBox = styled.Image`
  flex: 1;
  width: undefined;
  height: undefined;
`

export const LabelInput = styled.Text`
  margin-top: ${RFValue(5)}px;
  margin-bottom: ${RFValue(5)}px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
`
export const InputForm = styled.TextInput`
  width: 100%;
  height: ${RFValue(50)}px;
  background-color: #f8f8f8;
  font-family: ${({ theme }) => theme.fonts.title};
  padding: ${RFValue(10)}px;
  border-radius: ${RFValue(8)}px;
  margin-bottom: ${RFValue(15)}px;
`;

export const ButtonUpdate = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: ${RFValue(50)}px;
  width: 80%;
  margin-top: ${RFValue(10)}px;
  margin-left: 10%;
  border-radius: ${RFValue(8)}px;
  background-color: ${({ theme }) => theme.colors.bluedark};
`

export const TitleButtonUpdate = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.title};
`;

export const ContentFooter = styled.View`
  flex: 1;
  width: 100%;
  margin-top: ${RFValue(20)}px;

`;

export const LogoImg = styled.Image`
  width: ${RFValue(100)}px;
  height: ${RFValue(70)}px;;
`;

export const Description = styled.Text`
  font-size: ${RFValue(12)}px;
  font-style: italic;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${RFValue(2)}px;
  font-family: ${({ theme }) => theme.fonts.description};
`;

export const ButtonVessel = styled.TouchableOpacity`
  width: ${RFValue(135)}px;
  height: ${RFValue(191)}px;
  padding: ${RFValue(20)}px;

  margin-right: ${RFValue(10)}px;
  margin-left: ${RFValue(10)}px;

  justify-content: center;
  align-items: center;

  border: ${RFValue(2)}px;
  border-radius: ${RFValue(10)}px;

  border-color: #FFF;
`;

export const ImgButton = styled.View`
    margin-top: ${RFValue(20)}px;
`;

export const Disable = styled.View`
  opacity: 0.7;
`;






