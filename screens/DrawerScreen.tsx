import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';

import { AvatarGuest, Box, height, Text } from '../constants';
import { HOST } from '../constants/service';
interface DrawerScreenProps {
  user?: any;
  isLogin?: boolean;
  onPress?: () => void;
}
const DrawerScreen = ({ user, isLogin, onPress }: DrawerScreenProps) => {
  //   const { user } = useSelector((state: ApplicationState) => state.userReducer);
  //   const dispatch = useDispatch()
  // console.log(user, isLogin);
  const urlAvatar = !isLogin ? AvatarGuest : { uri: HOST + user.avatar };
  const name = !isLogin ? 'Guest' : user.name;
  const BtnLogin = () =>
    !isLogin ? (
      <TouchableOpacity {...{ onPress }}>
        <Text variant="name" style={{ textTransform: 'uppercase' }}>
          {name}
        </Text>
      </TouchableOpacity>
    ) : (
      <Text variant="name" style={{ textTransform: 'uppercase' }}>
        {name}
      </Text>
    );
  return (
    <Box flex={1}>
      <Box flex={0.2} backgroundColor="white">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderBottomRightRadius="xl"
          backgroundColor="secondary"
        />
      </Box>
      <Box flex={0.8}>
        <Box flex={1} backgroundColor="secondary" />
        <Box flex={1} backgroundColor="greenLight" />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundColor="white"
          borderTopLeftRadius="xl"
          borderBottomRightRadius="xl"
        />
      </Box>
      <Box flex={0.4} position="absolute" top={height * 0.1} left={0} right={0}>
        <Box justifyContent="center" alignItems="center">
          <Avatar.Image
            size={150}
            source={
              urlAvatar
              // { uri: HOST + urlAvatar }
            }
            style={{
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 24,
            }}
          />
          <Box margin="l">
            <BtnLogin />
          </Box>
        </Box>
      </Box>
      <Box flex={0.201} backgroundColor="white">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderTopLeftRadius="xl"
          backgroundColor="greenLight"
        />
      </Box>
    </Box>
  );
};
export default DrawerScreen;
