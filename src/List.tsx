import { ScrollView, StyleSheet, View } from "react-native";
import { Card } from "./components/cards";
import { Header } from "./components/header";
import { Cards_Object } from "./static/objetcs";
import { card_style } from "./styles/components/card";
import { Colors } from "./styles/_abstract";

export function List() {
    return (
        <View style={styles.container}>
            <Header />

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={card_style.cards_container}
            >
                {Cards_Object.map((card) => {
                    return <Card key={card.id} id={card.id} title={card.title} />
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
});
