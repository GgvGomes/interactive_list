import { useState } from "react";

import Animated, { 
    SharedValue,
    runOnJS,
    useSharedValue,
    useAnimatedStyle
} 
from "react-native-reanimated";
import { movableCard } from "../styles/components/movableCard";
import { Card, Card_Props } from "./cards";

import { Gesture, GestureDetector, PanGestureHandler } from 'react-native-gesture-handler'
import { Cards } from "../styles/_abstract";
import { PanGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture";

export function MovabelCard({ title, id, cardsPosition, scrollY, cardsCount }: Card_Props & {
    cardsPosition: SharedValue<number[]>,
    scrollY: SharedValue<number>,
    cardsCount: number,
}) {
    const [moving, setMoving] = useState(false);
    const top = useSharedValue(cardsPosition.value[id] * Cards.CARDS_HEIGHT);

    const longPressGesture = Gesture.LongPress()
        .onStart(() => {
            runOnJS(setMoving)(true);
            console.log('a')
            // console.log('Long press started');
        })
        .minDuration(500);
        // .onEnd(() => {
        //     runOnJS(setMoving)(false);
        //     // console.log('Long press ended');
        // })
        
    const dragGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesDown((event, state) => {
        moving == true ? state.activate() : state.fail();
    })
    .onUpdate((event) => {
        console.log(event)
        top.value = event.absoluteY + scrollY.value;
    })

    const animatedStyle = useAnimatedStyle(() => {
        return {
            top: top.value - Cards.CARDS_HEIGHT,
            opacity: moving ? 1 : 0.4,
        }
    })

    return (
        <Animated.View style={[movableCard.container, animatedStyle]}>
            <GestureDetector gesture={Gesture.Race(dragGesture, longPressGesture)}>
                <Card title={title} id={id} />
            </GestureDetector>
        </Animated.View>
    )
}