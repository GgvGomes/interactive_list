import { useEffect, useMemo, useState } from "react";

import Animated, {
  SharedValue,
  runOnJS,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  cancelAnimation,
} from "react-native-reanimated";
import { Card, Card_Props } from "./cards";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Cards } from "../styles/_abstract";

import { movableCard } from "../styles/components/movableCard";

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

  function objectMove(positions: number[], from: number, to: number) {
    "worklet";
    const newPostion = Object.assign({}, positions);
    // console.log(newPostion);

    // Sempre acontece uma animação de uma pra outro, oq faz com que sempre seja atualizado
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
        if (!moving) top.value = withSpring(currentPosition * Cards.CARDS_HEIGHT);
      }
    },
    [moving]
  );

  const longPressGesture = Gesture.LongPress()
    .onStart((event) => {
      runOnJS(setMoving)(true);
      // console.log("Long press started");
    })
    .minDuration(200);
  // useEffect(() => console.log(moving), [moving]);

  // com uns 3 segundo ele n roda
  const dragGesture = Gesture.Pan()
    .manualActivation(false)
    .onTouchesMove((event, state) => {
      moving == true ? state.activate() : state.fail();
    })
    .onUpdate((event) => {
      const positionY = event.absoluteY + scrollY.value;
      top.value = positionY - Cards.CARDS_HEIGHT - 50;
      // - 50 é para ficar mais centralizado

      const startPositionList = 0;
      const endPositionList = cardsCount - 1; // descartando 1 do length
      const currentPosition = Math.floor(positionY / Cards.CARDS_HEIGHT);

      const newPosition = Math.max(
        startPositionList,
        Math.min(currentPosition, endPositionList)
      );

      ("worklet");
      if (newPosition != cardsPosition[id]) {
        cardsPosition.value = objectMove(
          cardsPosition.value,
          cardsPosition.value[id],
          newPosition
        );
      }
    })
    .onFinalize((event) => {
      const newPosition = cardsPosition.value[id] * Cards.CARDS_HEIGHT;
      top.value = withSpring(newPosition);

      runOnJS(setMoving)(false);
    })
    .onEnd((event) => {
      runOnJS(setMoving)(false);
    })
    .simultaneousWithExternalGesture(longPressGesture);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value - Cards.CARDS_HEIGHT,
      opacity: withSpring(moving ? 1 : 0.4),
      zIndex: moving ? 1 : 0,
    };
  }, [moving]);

  return (
    <Animated.View style={[movableCard.container, animatedStyle]}>
      <GestureDetector gesture={Gesture.Race(longPressGesture, dragGesture)}>
        <Card title={title} id={id} />
      </GestureDetector>
    </Animated.View>
  );
}
