import { StyleSheet, View } from "react-native";

import { Header } from "../components/header";
import { MovabelCard } from "../components/movableCard";

import { Cards_Object } from "../static/objetcs";
import { Cards, Colors } from "../styles/_abstract";
import { card_style } from "../styles/components/card";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

export function List() {
    const scrollY = useSharedValue(0);
    const cardsPosition = useSharedValue(listToObject(Cards_Object));

    const handleScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    function listToObject(list: typeof Cards_Object) {
        const listOfCards = Object.values(list);
        const obj : any = {};
        listOfCards.forEach((card, index) => {
            obj[card.id] = index;
        });

        return obj;

        // return list.reduce((obj, item) => {
        //     obj[item.id] = item;
        //     return obj;
        // }, {});
    }

    return (
        <View style={styles.container}>
            <Header />

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                style={card_style.cards_container}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ height: Cards_Object.length * Cards.CARDS_HEIGHT }}
            >
                {Cards_Object.map((card) => {
                    return (
                        <MovabelCard
                            key={card.id}
                            id={card.id}
                            title={card.title}
                            scrollY={scrollY}
                            cardsCount={Cards_Object.length}
                            cardsPosition={cardsPosition}
                        />
                    )
                })}
            </Animated.ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        color: 'aliceblue', 
        // fontFamily: "'Roboto', sans-serif",
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
});
