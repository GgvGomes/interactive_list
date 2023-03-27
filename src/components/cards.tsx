import { Text, View } from "react-native"
import { card_style } from "../styles/components/card"

type Card_Props = {
    title: string,
    id: number,
}

export function Card({title, id}: Card_Props){
    return(
        <View style={card_style.card}>
            <Text style={card_style.text_card}>{title}</Text>

            {/* <Icon> */}
        </View>
    )
}