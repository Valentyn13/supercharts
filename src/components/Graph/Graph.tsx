import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Circle, Line, Mask, Rect } from 'react-native-svg';
import * as d3 from 'd3';
import { ChartData, ChartValue } from '../../entities/chartEntities';
import styles from './Graph.styles';
import useChartAnimation from '../../hooks/useChartMorphAnimation';
import Colors from '../../config/colors';
import Size from '../../config/size';

// Constants
const COLORS = {
    High: Colors.chartHigh,
    Medium: Colors.chartMedium,
    Low: Colors.chartLow
};
const contentPaddingLeft = Size.jumbo;
const contentPaddingRight = 0;

// Types
interface GradientChartProps {
    data: ChartData[];
    selectedDate?: string;
    height?: number;
    padding?: number;
    width?: number;
}

const GradientChart: React.FC<GradientChartProps> = ({
    data,
    selectedDate,
    height = Size.graphDefaultHeight,
    padding = Size.graphPadding,
    width = Size.graphDefaultWidth
}) => {
    const chartData = useMemo(() => {
        let filtered = data;
        if (selectedDate) {
            filtered = data.filter(d => d.date.startsWith(selectedDate));
        }

        // Sort by time if needed, can be removed if data is already sorted
        return filtered.sort((a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    }, [data, selectedDate]);

    const { linePath, areaPath, lastPoint } = useMemo(() => {
        if (chartData.length === 0) {
            return { linePath: '', areaPath: '', lastPoint: null };
        }

        const chartHeight = height - padding * 2;

        const valueToY: Record<ChartValue, number> = {
            High: padding,
            Medium: padding + chartHeight / 2,
            Low: padding + chartHeight
        };

        const xScale = d3.scaleTime()
            .domain(d3.extent(chartData, d => new Date(d.date)) as [Date, Date])
            .range([padding + contentPaddingLeft, width - padding - contentPaddingRight]);

        const points = chartData.map(d => ({
            x: xScale(new Date(d.date)),
            y: valueToY[d.value],
            value: d.value
        }));

        // line generator with smooth curve
        const line = d3.line<typeof points[0]>()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveCatmullRom.alpha(0.5));

        // area generator
        const area = d3.area<typeof points[0]>()
            .x(d => d.x)
            .y0(height - padding)
            .y1(d => d.y)
            .curve(d3.curveCatmullRom.alpha(0.5));

        return {
            linePath: line(points) || '',
            areaPath: area(points) || '',
            lastPoint: points[points.length - 1]
        };
    }, [chartData, height, padding, width]);

    const { animatedLinePath, animatedAreaPath, animatedLastPoint } = useChartAnimation({
        linePath,
        areaPath,
        lastPoint
    });

    if (chartData.length === 0) {
        return (
            <View style={[styles.container, { height, width }]}>
                <Text style={styles.noData}>No data available</Text>
            </View>
        );
    }

    const chartHeight = height - padding * 2;

    return (
        <View style={[styles.container, { height, width }]}>
            <Svg width={width} height={height}>
                <Defs>
                    {/* Gradient */}
                    <LinearGradient id="levelGradient" x1="0" y1="0" x2="0" y2="1">
                        <Stop offset="0%" stopColor={COLORS.High} />
                        <Stop offset="50%" stopColor={COLORS.Medium} />
                        <Stop offset="100%" stopColor={COLORS.Low} />
                    </LinearGradient>

                    {/* Area gradient */}
                    <LinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <Stop offset="0%" stopColor={COLORS.High} />
                        <Stop offset="50%" stopColor={COLORS.Medium} />
                        <Stop offset="100%" stopColor={COLORS.Low} />
                    </LinearGradient>

                    {/* Opacity */}
                    <LinearGradient id="opacityGradient" x1="0" y1="0" x2="1" y2="0">
                        <Stop offset="0%" stopColor="white" stopOpacity="0.9" />
                        <Stop offset="100%" stopColor="white" stopOpacity="0" />
                    </LinearGradient>

                    {/* Mask */}
                    <Mask id="areaMask">
                        <Rect x="0" y="0" width={width} height={height} fill="url(#opacityGradient)" />
                    </Mask>
                </Defs>

                {/* Level lines */}
                <Line
                    x1={padding}
                    y1={padding}
                    x2={width - padding}
                    y2={padding}
                    stroke={Colors.gridLine}
                    strokeWidth="2"
                    strokeDasharray="6"
                    opacity="0.4"
                />
                <Line
                    x1={padding}
                    y1={padding + chartHeight / 2}
                    x2={width - padding}
                    y2={padding + chartHeight / 2}
                    stroke={Colors.gridLine}
                    strokeWidth="2"
                    strokeDasharray="6"
                    opacity="0.4"
                />
                <Line
                    x1={padding}
                    y1={padding + chartHeight}
                    x2={width - padding}
                    y2={padding + chartHeight}
                    stroke={Colors.gridLine}
                    strokeWidth="2"
                    strokeDasharray="6"
                    opacity="0.4"
                />

                {/* Area fill */}
                <Path
                    d={animatedAreaPath}
                    fill="url(#areaGradient)"
                    mask="url(#areaMask)"
                />

                {/* Main Line */}
                <Path
                    d={animatedLinePath}
                    stroke="url(#levelGradient)"
                    strokeWidth={Size.strokeWidthM}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Dot */}
                {animatedLastPoint && (
                    <Circle
                        cx={animatedLastPoint.x}
                        cy={animatedLastPoint.y}
                        r="6"
                        fill={COLORS[animatedLastPoint.value]}
                    />
                )}
            </Svg>

            {/* Y-Axis Labels */}
            <View style={styles.labels}>
                <Text style={[styles.label, { top: padding - 9 }]}>High</Text>
                <Text style={[styles.label, { top: padding + chartHeight / 2 - 9 }]}>Medium</Text>
                <Text style={[styles.label, { top: padding + chartHeight - 9 }]}>Low</Text>
            </View>
        </View>
    );
};



export default GradientChart;

