import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { List } from "./pages/List";
import { Text } from "react-native";

export default function App() {
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>  
          <StatusBar style="light" translucent />
          
          <List />
      </GestureHandlerRootView>
  );
}
