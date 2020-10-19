import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { BackgroundPicture, Box, Text } from '../../constants';
const styles = StyleSheet.create({
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    backgroundColor: '#0c0d34',
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
});
const BackgroundHome = () => {
  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <Box flex={1 / 3} backgroundColor="black">
        <Box flex={1} backgroundColor="white" borderBottomRightRadius="xl" />
      </Box>
      <Box flex={1 / 3}>
        <View style={styles.underlay}>
          <Image source={BackgroundPicture} style={styles.picture} />
        </View>
      </Box>
      <Box flex={1 / 3} backgroundColor="blueWhite">
        <Image
          source={BackgroundPicture}
          style={{
            ...StyleSheet.absoluteFillObject,
            width: undefined,
            height: undefined,
          }}
        />
        <Box
          backgroundColor="secondary"
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderTopLeftRadius="xl"
        />
      </Box>
    </View>
  );
};

export default BackgroundHome;
