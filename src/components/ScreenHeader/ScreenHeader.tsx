import { Text, View } from "react-native";
import styles from "./ScreenHeader.styles";
type Props = {
    title: string;
}

const ScreenHeader = ({ title }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

export default ScreenHeader;