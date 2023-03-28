import { StyleSheet } from "react-native";
import { Colors } from "../_abstract";

export const header_style = StyleSheet.create({
    header_container: {
        backgroundColor: Colors.secondaryColor,

        flex: 1/ 4,

        alignItems: 'center',
        justifyContent: 'center',
    },
    
    text_content: {
        width: 300,

        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },

    header_title:{
        fontSize: 44,
        // fontWeight: "800",

        color: 'aliceblue',
    },

    header_text:{
        color: Colors.textColor,
        fontSize: 12,

        textAlign: 'center',
    },
});