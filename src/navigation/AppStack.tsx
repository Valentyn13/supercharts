import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AnalyticsScreen } from "../screens/AnalyticsScreen/AnalyticsScreen";
import { defaultStackConfig } from "./config/stackConfig";

const AppNavigator = createNativeStackNavigator();

const AppStackNavigator = () => {
    return (
        <AppNavigator.Navigator screenOptions={defaultStackConfig}>
            <AppNavigator.Screen name="TaskAction" component={AnalyticsScreen} options={{ title: 'Task Action' }} />
        </AppNavigator.Navigator>
    );
};

export default AppStackNavigator;