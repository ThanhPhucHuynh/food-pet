import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import Animated from 'react-native-reanimated';

import { Header } from '../components';
import { Box, height, width, Text } from '../constants';
import { HOST } from '../constants/service';
import { AuthenticationRoutes, HomeRoutes, StackNavigationProps } from '../navigation';
interface DetailProps {
  _id: string;
  product: {
    _id: string;
    name: string;
    type: string;
    description: string;
    picture: string[];
    price: number;
    number: number;
  };
}
const styles = StyleSheet.create({
  underlay: {
    height: height / 3,
    //   width: width
    // ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: 40,
  },
});
const Detail = ({ navigation }: StackNavigationProps<AuthenticationRoutes, 'Detail'>) => {
  //   const navigation = useNavigation();

  const route = useRoute<any>();
  const [product, setProduct] = useState<any>();
  const [pics, setPics] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [type, setType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  // console.log(route.params.product);

  const Cover = () => (
    <Card>
      <Card.Cover source={{ uri: HOST + product.picture[0] }} />
    </Card>
  );

  useEffect(() => {
    if (route.params) {
      setProduct(route.params.product);
      setPics(route.params.product.picture);
      setName(route.params.product.name);
      setType(route.params.product.type);
      setDescription(route.params.product.description);
    }
  }, [route.params.product._id]);

  return (
    <Box flex={1} backgroundColor="white">
      <Header label="Detail" />
      <ScrollView>
        <Box>
          <Box borderTopLeftRadius="xl" margin="xl" style={{ height: 'auto' }}>
            <Animated.View style={styles.underlay}>
              <Image
                source={{ uri: HOST + pics[index] }}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  width: undefined,
                  height: undefined,
                  borderRadius: 24,
                }}
              />
            </Animated.View>
            <Animated.View
              style={{
                margin: 2,
                height: 100,
              }}>
              <Box
                justifyContent="center"
                alignItems="center"
                style={{
                  ...StyleSheet.absoluteFillObject,
                  marginTop: 10,
                }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {pics.map((pic, i) => {
                    const width = i === index ? 75 : 50;
                    const height = width;
                    const borderWidth = index === i ? 1 : 0;
                    return (
                      <Box style={{ margin: 5, height: height + 2, width, borderWidth }}>
                        <TouchableOpacity onPress={() => setIndex(i)}>
                          <Image
                            source={{ uri: HOST + pic }}
                            style={{
                              width,
                              height,
                              borderWidth,
                              borderRadius: 2,
                            }}
                          />
                        </TouchableOpacity>
                      </Box>
                    );
                  })}
                </ScrollView>
              </Box>
            </Animated.View>
          </Box>
          <Box justifyContent="center" alignItems="center">
            <Text variant="titleHeader" style={{ fontSize: 30 }}>
              {name}
            </Text>
          </Box>
          <Box justifyContent="center" alignItems="center" margin="m">
            <Chip icon="information">{type}</Chip>
          </Box>
          <Box justifyContent="center" alignItems="center">
            <Text variant="titleHeader" style={{ fontSize: 20 }}>
              Introduction:
            </Text>
            <Box margin="l">
              <Text variant="" style={{ fontSize: 12, lineHeight: 30 }}>
                {description}
              </Text>
            </Box>
          </Box>
        </Box>
        <View>
          <Text>Detail</Text>
          <Button
            title="Dasd"
            onPress={() => {
              // navigation.navigate('Product');
            }}
          />
        </View>
      </ScrollView>
    </Box>
  );
};
export default Detail;
