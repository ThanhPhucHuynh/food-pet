import * as React from 'react';
import { List } from 'react-native-paper';

const ListAvtion = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section>
      <List.Accordion
        title="Uncontrolled Accordion"
        left={(props) => <List.Icon {...props} icon="folder" />}>
        <List.Item title="=" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
  );
};

export default ListAvtion;
