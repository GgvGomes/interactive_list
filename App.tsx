import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { List } from './src/List';
import './src/styles/global.css';
import "setimmediate";

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar
        style="light"
        translucent
      />

      <List />
    </GestureHandlerRootView>
  );
}