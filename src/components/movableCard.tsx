import { useEffect, useMemo, useState } from "react";

import Animated, {
  SharedValue,
  runOnJS,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { movableCard } from "../styles/components/movableCard";
import { Card, Card_Props } from "./cards";

import {
  Gesture,
  GestureDetector,
  LongPressGestureHandler,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { Cards } from "../styles/_abstract";
import { Platform } from "react-native";
import { useLongPress } from "use-long-press";

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
  //   const opacity = useSharedValue(0.4);
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(cardsPosition.value[id] * Cards.CARDS_HEIGHT);

  const longPressGesture = Gesture.LongPress()
    .onStart((event) => {
      runOnJS(setMoving)(true);

      //   opacity.value = withSpring(opacity.value + 0.6);
      console.log("Long press started");
    })
    // .onFinalize(() => runOnJS(setMoving)(true))
    .minDuration(500);

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
      //   opacity: opacity,
    //   opacity: withSpring(moving ? 1 : 0.4),
      opacity: moving ? 1 : 0.4,
      zIndex: moving ? 1 : 0,
    };
  }, [moving]);

  return (
    <Animated.View style={[movableCard.container, animatedStyle]}>
      <GestureDetector gesture={longPressGesture}>
        <Card title={title} id={id} />
      </GestureDetector>
    </Animated.View>
  );
}
