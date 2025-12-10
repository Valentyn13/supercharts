import { StyleSheet } from "react-native";
import Size from "../../config/size";

const styles = StyleSheet.create({
    container: {
        marginBottom: Size.xl,
    },
    scrollContent: {
        paddingHorizontal: 0,
        gap: Size.m,
        flexDirection: 'row',
    },
});

export default styles;