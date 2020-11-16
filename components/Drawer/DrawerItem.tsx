import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Axios from 'axios';
import React from 'react';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator, Avatar, Colors } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Text } from '../../constants';
import { LogoutService } from '../../constants/service';
import { height, Theme, width } from '../../constants/theme';
import { AuthenticationRoutes, HomeRoutes } from '../../navigation';
import { checkCart, checkIsLogin } from '../../redux';

interface DrawerItemProps {
  icon: any;
  color: any;
  screen: any;
  ComponentScreen?: string[];
  label: string;
}

const DrawerItem = ({ icon, color, screen, label, ComponentScreen }: DrawerItemProps) => {
  const { navigate, goBack } = useNavigation<DrawerNavigationProp<HomeRoutes, 'HomeDraw'>>();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);

  const LoadingComponent = () =>
    loading ? (
      <ActivityIndicator animating color={Colors.green200} />
    ) : (
      <MaterialCommunityIcons name={icon} size={20} color="white" />
    );
  return (
    <TouchableOpacity
      onPress={async () => {
        setLoading(true);
        console.log(screen);
        if (screen === 'Logout') {
          const data = await LogoutService();
          dispatch(checkIsLogin());
          dispatch(checkCart());
          navigate('HomeDraw');
        } else {
          setLoading(false);

          navigate(screen);
        }
      }}>
      <Box flexDirection="row" margin="s" paddingLeft="m" alignItems="center">
        <Box
          backgroundColor={color}
          padding="s"
          style={{
            borderRadius: 40,
          }}>
          <LoadingComponent />
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
