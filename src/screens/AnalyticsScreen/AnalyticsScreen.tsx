import { Text, useWindowDimensions } from "react-native";
import styles from "./AnalyticsScreen.styles";
import ScreenWrapper from "../../components/ScreenWrapper/ScreenWrapper";
import ScreenHeader from "../../components/ScreenHeader/ScreenHeader";
import Tabs from "../../components/Tabs/Tabs";
import { useGetChartData } from "../../hooks/useGetChartData";
import { useEffect, useMemo } from "react";
import { useTabState } from "../../hooks/useTabState";
import GradientChart from "../../components/Graph/Graph";
import Size from "../../config/size";
import SpinLoader from "../../components/SpinLoader/SpinLoader";

const AnalyticsScreen = () => {

    const { getChartData, chartData, loading, error } = useGetChartData();
    const { activeTab, setActiveTab, onTabPress } = useTabState();
    const { width } = useWindowDimensions();
    const chartWidth = width - (Size.l * 2);

    const uniqueDates = useMemo(() => {
        return Array.from(new Set(chartData.map((d) => d.date.split('T')[0]))).sort();
    }, [chartData]);

    useEffect(() => {
        getChartData();
    }, []);

    useEffect(() => {
        if (uniqueDates.length > 0 && !activeTab) {
            setActiveTab(uniqueDates[0]);
        }
    }, [uniqueDates, activeTab]);

    const currentTab = activeTab || (uniqueDates.length > 0 ? uniqueDates[0] : "");

    return (
        <ScreenWrapper>
            <ScreenHeader title="My analytics" />

            <Text style={styles.title}>Energy level</Text>
            {loading ? (
                <SpinLoader />
            ) : (
                <>
                    <Tabs
                        tabs={uniqueDates}
                        activeTab={currentTab}
                        onTabPress={onTabPress}
                    />
                    <GradientChart
                        data={chartData}
                        selectedDate={currentTab}
                        height={Size.graphHeightLarge}
                        padding={Size.xxl}
                        width={chartWidth}
                    />
                </>
            )}
            {error && <Text style={styles.error}>{error}</Text>}
        </ScreenWrapper>
    );
};


export { AnalyticsScreen };
