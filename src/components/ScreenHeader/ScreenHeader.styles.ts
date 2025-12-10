import { StyleSheet } from "react-native";
import FontFamily from "../../config/fontFamily";
import Colors from "../../config/colors";
import Size from "../../config/size";
import FontSize from "../../config/fontSize";

const styles = StyleSheet.create({
    container: {
        paddingVertical: Size.xs,
        marginBottom: Size.xxl,
    },
    title: {
        color: Colors.white,
        fontSize: FontSize.L,
        fontFamily: FontFamily.Medium,
        fontWeight: '500',
        textAlign: 'center',
    }
});

export default styles;