import { useEffect, useMemo, useState } from "react";

import Animated, {
  SharedValue,
  runOnJS,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  useAnimatedReaction,
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
import { Cards_Object } from "../static/objetcs";

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

  function objectMove(positions: number[], from: number, to: number) {
    "worklet";
    const newPostion = Object.assign({}, positions);
    console.log(newPostion);

    for (const id in positions) {
      if (positions[id] == from) {
        newPostion[id] = to;
      }

      if (positions[id] == to) {
        newPostion[id] = from;
      }
    }

    return newPostion;
  }

  useAnimatedReaction(
    () => cardsPosition.value[id], // observa quando acontece animação nele
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving)
          top.value = withSpring(currentPosition * Cards.CARDS_HEIGHT);
      }
    },
    [moving]
  );

  const longPressGesture = Gesture.LongPress()
    .onStart((event) => {
      runOnJS(setMoving)(true);

      //   opacity.value = withSpring(opacity.value + 0.6);
      console.log("Long press started");
    })
    .minDuration(500);

  const dragGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((event, state) => {
      moving == true ? state.activate() : state.fail();
    })
    .onUpdate((event) => {
      const positionY = event.absoluteY + scrollY.value;
      top.value = positionY - Cards.CARDS_HEIGHT - 20;
      // - 20 é para ficar mais centralizado

      const startPositionList = 0;
      const endPositionList = cardsCount - 1; // descartando 1 do length
      const currentPosition = Math.floor(positionY / Cards.CARDS_HEIGHT);

      const newPosition = Math.max(
        startPositionList,
        Math.min(currentPosition, endPositionList)
      );

      // Eu acho q isso já funcionava
      // const newPosition = currentPosition;

      'worklet';
      if (newPosition != cardsPosition[id]) {
        cardsPosition.value = objectMove(
          cardsPosition.value,
          cardsPosition.value[id],
          newPosition
        );
      }
    })
    .onFinalize(() => {
      const newPosition = cardsPosition.value[id] * Cards.CARDS_HEIGHT;
      top.value = withSpring(newPosition);

      runOnJS(setMoving)(false);
    })
    .simultaneousWithExternalGesture(longPressGesture);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value - Cards.CARDS_HEIGHT,
      //   opacity: opacity,
      // opacity: withSpring(moving ? 1 : 0.4),
      opacity: moving ? 1 : 0.4,
      zIndex: moving ? 1 : 0,
    };
  }, [moving]);

  return (
    <Animated.View style={[movableCard.container, animatedStyle]}>
      <GestureDetector gesture={Gesture.Race(dragGesture, longPressGesture)}>
        <Card title={title} id={id} />
      </GestureDetector>
    </Animated.View>
  );
}
