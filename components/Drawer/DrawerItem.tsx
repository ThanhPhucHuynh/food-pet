import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';

import { Box, Text } from '../../constants';
import { height, Theme, width } from '../../constants/theme';
import { AuthenticationRoutes, HomeRoutes } from '../../navigation';

interface DrawerItemProps {
  icon: any;
  color: any;
  screen: any;
  label: string;
}

const DrawerItem = ({ icon, color, screen, label }: DrawerItemProps) => {
  //   console.log(screen);
  const { navigate, goBack } = useNavigation<DrawerNavigationProp<HomeRoutes, 'HomeApp'>>();
  //   const navigation = useNavigation<StackNavigationProp<AuthenticationRoutes, 'Login'>>();

  return (
    <TouchableOpacity
      onPress={() => {
        console.log(screen);
        navigate(screen);
      }}>
      <Box
        flexDirection="row"
        margin="s"
        paddingLeft="m"
        alignItems="center"
        // style={{ margin: height * 0.018 }}
      >
        <Box
          backgroundColor={color}
          padding="s"
          style={{
            borderRadius: 40,
          }}>
          <MaterialCommunityIcons name={icon} size={20} color="white" />
        </Box>
        <Text
          style={{
            margin: 15,
          }}
          variant="titleButton">
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};
export default DrawerItem;
