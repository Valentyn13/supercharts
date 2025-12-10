import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./ScreenWrapper.styles";
import LinearGradient from "react-native-linear-gradient";

type Props = {
    children: ReactNode;
}

const ScreenWrapper = ({ children }: Props) => {
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#070709', '#161038']}
                style={styles.gradient}
            />
            {children}
        </SafeAreaView>
    );
};

export default ScreenWrapper;