import { useEffect, useState } from "react";

import Animated, {
  SharedValue,
  runOnJS,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { movableCard } from "../styles/components/movableCard";
import { Card, Card_Props } from "./cards";

import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { Cards } from "../styles/_abstract";

export function MovabelCard({
  title,
  id,
  cardsPosition,
  scrollY,
  cardsCount,
}: Card_Props & {
  cardsPosition: SharedValue<number[]>;
  scrollY: SharedValue<number>;
  cardsCount: number;
}) {
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(cardsPosition.value[id] * Cards.CARDS_HEIGHT);

  const longPressGesture = Gesture.LongPress()
    .onStart((event) => {
      runOnJS(setMoving)(true);
      console.log("Long press started");
    })
    .minDuration(500);

  useEffect(() => {
    console.log(moving, "fui alterado");
  }, [moving]);

  const dragGesture = Gesture.Pan()
  .manualActivation(true)
  .onTouchesDown((event, state) => {
      moving == true ? state.activate() : state.fail();
  })
  .onUpdate((event) => {
      // console.log(event)
      top.value = event.absoluteY + scrollY.value;
  })
  .onFinalize(() => {
    runOnJS(setMoving)(false);
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value - Cards.CARDS_HEIGHT,
      opacity: withSpring(moving ? 1 : 0.4),
      zIndex: moving ? 1 : 0,
    };
  }, [moving]);

  const composed = Gesture.Race(longPressGesture, dragGesture);

  return (
    <Animated.View style={[movableCard.container, animatedStyle]}>
      <GestureDetector gesture={composed}>
        <Card title={title} id={id} />
      </GestureDetector>
    </Animated.View>
  );
}
