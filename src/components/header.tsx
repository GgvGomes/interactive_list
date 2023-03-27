import { Text, View } from "react-native";
import { header_style } from "../styles/components/header";

export function Header() {
    return (
        <View style={header_style.header_container}>
            <View style={header_style.text_content} >
                <Text style={header_style.header_title}>Musicos</Text>

                <Text style={header_style.header_text}>Defina a sequência do musicos e bandas que você mais gosta no topo da lista.</Text>
            </View>
        </View >
    );
}