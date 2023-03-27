import { StyleSheet } from "react-native";
import { Cards, Colors } from "../_abstract";

export const card_style = StyleSheet.create({
    cards_container: {
        marginTop: 16,

        alignItems: "center",
        justifyContent: "flex-start",

        width: "100%",

        padding: 28,
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

        width: "100%",
    },

    text_card: {
        color: Colors.textColor,

        fontSize: 16,
        fontWeight: "500",
    }
});