import { StyleSheet } from "react-native";
import { Cards, Colors } from "../_abstract";

export const card_style = StyleSheet.create({
    cards_container: {
        flex: 1,
        padding: 32,
        paddingTop: 0,
        marginTop: 32,
        position: "relative",
    },

    card: {
        width: "100%",
        borderRadius: Cards.CARDS_SPACE,
        backgroundColor: Colors.primaryColor,
        padding: 16, // 41:41

        // boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
        
        height: Cards.CARDS_HEIGHT - Cards.CARDS_SPACE,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    card_text: {
        color: Colors.textColor,

        fontSize: 18,
        fontWeight: "500",
    },
});