import { StyleSheet } from "react-native";
import Size from "../../config/size";

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        paddingVertical: Size.xl,
        paddingHorizontal: Size.l,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: -1,
    },
});

export default styles;