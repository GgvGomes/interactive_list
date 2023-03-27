import { StyleSheet } from "react-native";
import { Cards, Colors } from "../_abstract";

export const card_style = StyleSheet.create({
    cards_container: {
        flex: 1,
        padding: 32,
    },

    card: {
        backgroundColor: Colors.primaryColor,
        borderRadius: 8,

        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
        
        padding: 12,
        marginBottom: Cards.CARDS_SPACE,
        height: Cards.CARDS_HEIGHT,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    card_text: {
        color: Colors.textColor,

        fontSize: 16,
        fontWeight: "500",
    },
});