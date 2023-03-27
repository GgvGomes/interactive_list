import { StatusBar } from 'expo-status-bar';

import { List } from './src/List';
import './src/styles/global.css';

export default function App() {
  return (
    <>
      <StatusBar
        style="light"
        translucent
      />

      <List />
    </>
  );
}