import { Text, View } from "react-native"
import { card_style } from "../styles/components/card"

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Card_Props = {
    title: string,
    id: number,
}

export function Card({title, id}: Card_Props){
    return(
        <View style={card_style.card}>
            <Text style={card_style.card_text}>{title}</Text>

            <MaterialIcons name="drag-indicator" size={28} color={'#fff'} 
            //  onPress={onPress}
            />
        </View>
    )
}