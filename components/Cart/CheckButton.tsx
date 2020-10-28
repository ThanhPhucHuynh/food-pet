import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Provider as PaperProvider, List, Divider, useTheme, Appbar } from 'react-native-paper';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';

export default function CheckButton() {
  const theme = useTheme();
  const [text, setText] = useState('');

  const renderHandle = () => (
    <View style={[styles.header, { backgroundColor: 'white' }]}>
      <View style={styles.panelHandle} />
      <Divider style={{ alignSelf: 'stretch', marginTop: 10 }} />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollBottomSheet
        componentType="FlatList"
        snapPoints={[0, '60%', '90%']}
        initialSnapIndex={2}
        renderHandle={renderHandle}
        data={Array.from({ length: 200 }).map((_, i) => String(i))}
        keyExtractor={(i) => i}
        renderItem={({ item }) => (
          <List.Item
            onPress={() => {
              console.log('Ad');
            }}
            title="Just a titles"
            description="A description you might know."
            left={(props) => <List.Icon {...props} icon="folder" />}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  panelHandle: {
    width: 30,
    height: 7,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 4,
  },
});
