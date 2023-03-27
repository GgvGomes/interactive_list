import { StyleSheet } from 'react-native';
import { Cards } from '../_abstract';

export const movableCard = StyleSheet.create({
    container:{
        position: 'absolute',
        left: 0,
        right: 0,
        // marginBottom: Cards.CARDS_SPACE,
    }
});
