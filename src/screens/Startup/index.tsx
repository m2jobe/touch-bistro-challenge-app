import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ApplicationScreenProps } from 'types/navigation';
import styles from './styles';

const Startup = ({ navigation }: ApplicationScreenProps) => {
  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, 2000),
    );
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View>
      <ActivityIndicator
        testID="activity-indicator"
        style={styles.loadingContainer}
        size={'large'}
      />
    </View>
  );
};

export default Startup;
