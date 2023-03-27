import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from './src/components/cards';
import { Header } from './src/components/header';
import { Cards_Object } from './src/static/objetcs';
import { card_style } from './src/styles/components/card';
import { Colors } from './src/styles/_abstract';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />

      <View style={card_style.cards_container}>
        {Cards_Object.map((card) => {
          return <Card key={card.id} id={card.id} title={card.title} />
        })}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'flex-start',

    color: Colors.textColor,
    fontFamily: "'Roboto', sans-serif",
  },
});
