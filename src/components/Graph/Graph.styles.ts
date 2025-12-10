import { StyleSheet } from "react-native";
import FontFamily from "../../config/fontFamily";
import Colors from "../../config/colors";
import Size from "../../config/size";
import FontSize from "../../config/fontSize";

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundDark,
        borderRadius: Size.borderRadiusS,
        position: 'relative',
    },
    labels: {
        position: 'absolute',
        left: Size.xxl,
        top: -Size.p15,
        bottom: 0,
        paddingLeft: Size.s,
    },
    label: {
        fontFamily: FontFamily.Regular,
        position: 'absolute',
        fontSize: FontSize.MD,
        color: Colors.textMuted,
        fontWeight: '500',
    },
    noData: {
        color: Colors.textSecondary,
        textAlign: 'center',
        paddingVertical: Size.xxxl,
    },
});


export default styles;