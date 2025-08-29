import React from 'react';
import { StatusBar, View, Platform } from 'react-native';

type StatusBarComponentProps = {
  barStyle?: 'default' | 'light-content' | 'dark-content';
  backgroundColor?: string;
  translucent?: boolean;
};

const StatusBarComponent: React.FC<StatusBarComponentProps> = ({
  barStyle = 'dark-content',
  backgroundColor = 'black',
  translucent = false,
}) => {
  return (
    <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0, backgroundColor }}>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={backgroundColor}
        translucent={translucent}
      />
    </View>
  );
};

export default StatusBarComponent;
