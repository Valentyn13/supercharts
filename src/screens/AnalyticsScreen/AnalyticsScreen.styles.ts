import { StyleSheet } from "react-native";
import FontFamily from "../../config/fontFamily";
import Colors from "../../config/colors";
import Size from "../../config/size";
import FontSize from "../../config/fontSize";

const styles = StyleSheet.create({

    title: {
        fontSize: FontSize.XL,
        fontFamily: FontFamily.Bold,
        color: Colors.white,
        fontWeight: 'bold',
        marginBottom: Size.xl,
    },
    error: {
        color: Colors.error,
        fontSize: FontSize.S,
        marginTop: Size.mid,
    }
});

export default styles;