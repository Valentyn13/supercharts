import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Colors } from '../../config';

export const defaultStackConfig: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  animation: 'slide_from_right',
  contentStyle: {
    backgroundColor: 'transparent',
  },
};  
