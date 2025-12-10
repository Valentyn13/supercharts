import { StyleSheet } from "react-native";
import FontFamily from "../../config/fontFamily";
import Colors from "../../config/colors";
import Size from "../../config/size";
import FontSize from "../../config/fontSize";

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.buttonBackground,
        alignSelf: 'flex-start',
        paddingVertical: Size.p7,
        paddingHorizontal: Size.m,
        borderRadius: Size.borderRadiusM,
    },
    buttonActive: {
        backgroundColor: Colors.buttonActiveBackground,
    },
    textActive: {
        color: Colors.textActive,
    },

    text: {
        fontFamily: FontFamily.Medium,
        fontWeight: '500',
        lineHeight: Size.lineHeightS,
        fontSize: FontSize.SM,
        color: Colors.white,
    },
});

export default styles;