import { StatusBar } from 'expo-status-bar';

import { List } from './src/List';

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