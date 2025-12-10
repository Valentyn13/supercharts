import { useCallback, useState } from "react";
import { ChartData } from "../entities/chartEntities";
import { MOCK_CHART_DATA } from "./mocks/index";

export const useGetChartData = () => {
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getChartData = useCallback(async () => {
        try {
            setLoading(true);

            const data = await new Promise<ChartData[]>((resolve) => {
                setTimeout(() => {
                    resolve(MOCK_CHART_DATA);
                }, 1000);
            });
            setChartData(data);
        } catch (error) {

            setError('Error while loading chart');
        } finally {
            setLoading(false);
        }

    }, []);



    return {
        chartData,
        loading,
        error,
        getChartData,
    }
}