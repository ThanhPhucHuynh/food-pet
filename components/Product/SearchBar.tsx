import { AntDesign } from '@expo/vector-icons';
import { backgroundColor } from '@shopify/restyle';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button, Chip, Searchbar } from 'react-native-paper';

import { Box } from '../../constants';
const types = ['food', 'tool', 'care', 'other'];
interface SearchBarProps {
  onChangeSearch: (text: string) => void;
  onChangeFiller: (text: string[]) => void;
}

const SearchBar = ({ onChangeSearch, onChangeFiller }: SearchBarProps) => {
  const [searchText, setSearchText] = useState('');
  const [filler, setFiller] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [typeIndex, setTypeIndex] = useState([]);
  const onChangeSearchP = (query) => {
    setSearchQuery(query);
    onChangeSearch(query);
  };
  useEffect(() => {
    onChangeFiller(filler);
  }, [filler]);
  return (
    <Box>
      <Searchbar placeholder="Search" onChangeText={onChangeSearchP} value={searchQuery} />
      <Box flexDirection="row" justifyContent="center">
        {types.map((type, i) => {
          const selected = filler.indexOf(type) !== -1;
          const selectedColor = filler.indexOf(type) !== -1 ? 'white' : 'silver';
          const backgroundColor = filler.indexOf(type) !== -1 ? '#43a7d9' : 'white';
          return (
            <Box
              key={i}
              justifyContent="space-between"
              alignItems="center"
              style={{ margin: 2, marginTop: 5 }}>
              <Chip
                {...{ selected, selectedColor }}
                style={{ backgroundColor }}
                onPress={() => {
                  if (filler.indexOf(type) === -1) {
                    setFiller([...filler].concat(type));
                  } else {
                    setFiller(filler.filter((e) => e !== type));
                  }
                }}>
                {type}
              </Chip>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
export default SearchBar;
