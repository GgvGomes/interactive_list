import { Text, View } from "react-native";
import { header_style } from "../styles/components/header";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_900Black,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

export function Header() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_900Black,
    Roboto_700Bold,
  });

  return (
    <>
      <View style={header_style.header_container}>
        <View style={header_style.text_content}>
          <Text
            style={[
              header_style.header_title,
              { fontFamily: "Roboto_900Black" },
            ]}
          >
            Musicos
          </Text>
          <Text style={header_style.header_text}>
            Defina a sequência do musicos e bandas que você mais gosta no topo
            da lista.
          </Text>
        </View>
      </View>
    </>
  );
}
