import { Video } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Avatar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { Box, pictureWelcome, Text, VideoInfo, width, height, theme } from '../constants/';
import { HOST } from '../constants/service';
import { ApplicationState, checkIsLogin } from '../redux';
const styles = StyleSheet.create({
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    // borderBottomRightRadius: 55,
    // backgroundColor: 'white',
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderBottomRightRadius: 55,
    // borderBottomLeftRadius: 55,
  },
});
const Info = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: ApplicationState) => state.userReducer);
  useEffect(() => {
    dispatch(checkIsLogin());
  }, []);
  return (
    <Box flex={1} backgroundColor="white">
      <StatusBar style="auto" />
      <Box
        flex={1 / 3.5}
        style={{ borderBottomRightRadius: 55 }}
        borderBottomRightRadius="xl"
        backgroundColor="grey"
        alignItems="center"
        justifyContent="flex-end">
        {/* <Box > */}
        <View style={styles.underlay}>
          {/* <Image source={pictureWelcome} style={styles.picture} /> */}
          <Video
            source={VideoInfo}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={{
              width,
              height: height / 3,
              // borderBottomLeftRadius: theme.borderRadii.xl,
            }}
          />
        </View>
        {/* </Box> */}
        <Box
          backgroundColor="white"
          flex={1 / 6}
          style={{ width, borderTopRightRadius: 55, borderTopLeftRadius: 55 }}
        />
      </Box>
      <Box flex={2 / 3}>
        <Box backgroundColor="white" position="absolute" top={0} left={0} right={0} bottom={0} />

        <Box
          backgroundColor="white"
          //   borderTopLeftRadius="xl"
          flex={1}
          padding="l"
          alignItems="center"
          justifyContent="space-evenly">
          <Text variant="title2">{user.name}</Text>
          <Text textAlign="center">{user.email}</Text>
          <Text paddingHorizontal="xl" textAlign="center" variant="body">
            Login to your account below or sign up for amazing experience
          </Text>
          {/* <Button
            onPress={() => {
              navigation.navigate('Login');
            }}
            variant="primary"
            label="Have an account? Login"
          />
          <Button
            label="Join us"
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
          <Button onPress={onPressA} variant="transparent" label="Forgot password?" /> */}
        </Box>
      </Box>
      <Box
        flex={1 / 4}
        justifyContent="center"
        // backgroundColor="black"
        position="absolute"
        style={{
          top: height / 5 - 50,
          left: width / 2 - 75,
        }}
        alignItems="center"
        alignContent="center">
        <Box
          backgroundColor="black"
          style={{
            borderRadius: theme.borderRadii.xl + 50,
            width: 152,
            height: 152,
          }}
          justifyContent="center"
          alignContent="center"
          alignItems="center">
          <Image
            source={{ uri: HOST + user.avatar }}
            style={{
              //   ...StyleSheet.absoluteFillObject,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              // elevation: 24,
              width: 150,
              height: 150,
              borderWidth: 1,
              //   opacity,
              borderRadius: theme.borderRadii.xl + 50,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Info;
