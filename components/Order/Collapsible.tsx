import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import { useSelector, useDispatch } from 'react-redux';

import { Box } from '../../constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationState, checkOrder } from '../../redux';
import BackgroundHome from '../Home/Background';
import CardOrder from './CardOrder';

const BACON_IPSUM =
  'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';
const CONTENTORDER = undefined;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CONTENT = [
  {
    title: 'First',
    content: BACON_IPSUM,
  },
  {
    title: 'Second',
    content: BACON_IPSUM,
  },
  {
    title: 'Third',
    content: BACON_IPSUM,
  },
  {
    title: 'Fourth',
    content: BACON_IPSUM,
  },
  {
    title: 'Fifth',
    content: BACON_IPSUM,
  },
];

const SELECTORS = [
  {
    title: 'First',
    value: 0,
  },
  {
    title: 'Third',
    value: 2,
  },
  {
    title: 'None',
  },
];
const colorStatus = [
  { title: 'Cho xac nhan', color: 'silver' },
  { title: 'Da xac nhan', color: 'blue' },
  { title: 'Shipping', color: 'green' },
  { title: 'Da Van chuyen', color: 'yellow' },
];
const CollapsibleComponent = () => {
  const [activeSections, setActiveSections] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [multipleSelect, setMultipleSelect] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [content, setContent] = useState(null);
  const order = useSelector((state: ApplicationState) => state.orderReducer);
  useEffect(() => {
    (async () => {
      await dispatch(checkOrder());
      setContent([...order]);
      order.orders.map((order) => {
        CONTENTORDER.push({
          title: order._id,
          content: order,
        });
      });
      console.log('useEffect Order');
    })();
  }, []);

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  const setSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Box
          style={{
            flex: 1,
            margin: 0,
            padding: 0,
          }}>
          <Text
            style={{
              color: section.status ? colorStatus[section.status - 1].color : 'silver',
            }}>
            {section.status ? colorStatus[section.status - 1].title : ''}{' '}
          </Text>
          <Text style={styles.headerText}>
            {section._id}
            <Text style={[styles.headerText, { opacity: 0.4 }]}>
              -- {section.status ? section.createdAt.toString().split('T')[0] : ''}
            </Text>
          </Text>
        </Box>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {section._id}
        </Animatable.Text>
        <CardOrder {...section} />
        <Animatable.View style={{ margin: 10, marginTop: 20 }} animation="bounceIn">
          <Box>
            <Box flexDirection="row" justifyContent="space-between">
              <Box>
                <Text style={styles.text}>Phone:</Text>
              </Box>
              <Box>
                <Text style={styles.text}>{section.phone}</Text>
              </Box>
            </Box>
            <Box flexDirection="row" justifyContent="space-between">
              <Box>
                <Text style={styles.text}>Address:</Text>
              </Box>
              <Box style={{ width: 200 }}>
                <Text style={styles.text}>{section.address}</Text>
              </Box>
            </Box>
            <Box flexDirection="row" justifyContent="space-between">
              <Box>
                <Text style={styles.text}>More:</Text>
              </Box>
              <Box>
                <Text style={styles.text}>{section.more}</Text>
              </Box>
            </Box>
            <Box flexDirection="row" justifyContent="space-between">
              <Box>
                <Text style={styles.text}>Price:</Text>
              </Box>
              <Box>
                <Text style={styles.textPrice}>{section.price}</Text>
              </Box>
            </Box>
          </Box>
        </Animatable.View>
      </Animatable.View>
    );
  };

  return (
    <View style={styles.container}>
      <BackgroundHome />
      <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
        <TouchableOpacity
          onPress={async () => {
            await dispatch(checkOrder());
          }}>
          <Text style={styles.title}>Order List</Text>
        </TouchableOpacity>
        <Accordion
          activeSections={activeSections}
          sections={order ? order.orders : [{}]}
          touchableComponent={TouchableOpacity}
          //   expandMultiple={multipleSelect}
          renderHeader={renderHeader}
          renderContent={renderContent}
          duration={400}
          onChange={setSections}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 15,
  },
  textPrice: {
    color: 'white',
    fontSize: 25,
  },
  header: {
    borderRadius: 4,
    padding: 10,
    margin: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 5,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    margin: 30,
    borderRadius: 15,
    padding: 20,
  },
  active: {
    backgroundColor: '#74BCB8',
  },
  inactive: {
    backgroundColor: 'white',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});
export default CollapsibleComponent;
