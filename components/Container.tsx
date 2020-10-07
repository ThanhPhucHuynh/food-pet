/* eslint-disable @typescript-eslint/no-unused-vars */
import { Video } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import React, { ReactNode } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  VideoContainer,
  pictureContainer,
  width,
  Box,
  theme,
  pictureWelcome,
  height as heightValue,
} from '../constants';

interface ContainerProps {
  children: ReactNode;
  footer: ReactNode;
  isRegister?: boolean;
  image?: any;
}

export const assets = [VideoContainer, pictureContainer];
const aspectRadio = 700 / 1125;
const height = width * aspectRadio;

const Container = ({ children, footer, isRegister, image }: ContainerProps) => {
  const insets = useSafeAreaInsets();
  const opacity = image ? 0.2 : 1;
  return (
    <Box
      flex={1}
      backgroundColor="secondary"
      height={heightValue * 1.044}
      // borderBottomLeftRadius="xl"
      borderBottomRightRadius="xl">
      <StatusBar style="light" />
      <Box backgroundColor="white">
        <Box borderBottomLeftRadius="xl" overflow="hidden" height={height}>
          {/* <Image
            source={pictureContainer}
            style={{
              ...StyleSheet.absoluteFillObject,
              width,
              height,
              borderBottomLeftRadius: theme.borderRadii.xl,
            }}
          /> */}
          {!isRegister ? (
            <Video
              source={VideoContainer}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={{
                width,
                height,
                borderBottomLeftRadius: theme.borderRadii.xl,
              }}
            />
          ) : (
            <Box>
              <Image
                source={pictureContainer}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  width,
                  height,
                  opacity,
                  borderBottomLeftRadius: theme.borderRadii.xl,
                }}
              />
              {image && (
                <Box
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    height,
                    width,
                  }}>
                  <Avatar.Image
                    size={200}
                    source={{ uri: image }}
                    style={{
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
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>

      <Box flex={1} overflow="hidden">
        {isRegister ? (
          <Image
            source={pictureContainer}
            style={{
              ...StyleSheet.absoluteFillObject,
              width,
              height,
              top: -height * 0.61,
            }}
          />
        ) : (
          <Video
            source={VideoContainer}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="stretch"
            shouldPlay
            isLooping
            style={{
              ...StyleSheet.absoluteFillObject,
              width,
              height,
              top: -height * 0.61,
            }}
          />
        )}
        <Box borderRadius="xl" borderTopLeftRadius={0} backgroundColor="white" flex={1}>
          {children}
        </Box>
      </Box>

      {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled>
        <ScrollView> */}
      <Box backgroundColor="secondary" borderBottomLeftRadius="xl">
        {footer}
        {/* <Box height={insets.bottom} /> */}
      </Box>
      {/* </ScrollView>
      </KeyboardAvoidingView> */}
    </Box>
  );
};

export default Container;
