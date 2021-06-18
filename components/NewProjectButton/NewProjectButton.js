import React from 'react';
import { TouchableOpacity } from 'react-native';
import NewIcon from '../NewIcon';

const NewProjectButton = ({ isModalVisible, setIsModalVisible }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => setIsModalVisible(!isModalVisible)}>
      <NewIcon width={32} height={32} />
    </TouchableOpacity>
  );
};

export default NewProjectButton;
