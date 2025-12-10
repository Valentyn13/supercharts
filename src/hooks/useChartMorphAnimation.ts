import { useState, useRef, useEffect } from "react";
import { ChartValue } from "../entities/chartEntities";
import * as d3 from 'd3';

const useChartAnimation = ({
    linePath,
    areaPath,
    lastPoint
}: {
    linePath: string;
    areaPath: string;
    lastPoint: { x: number; y: number; value: ChartValue } | null;
}) => {
    const [animatedLinePath, setAnimatedLinePath] = useState(linePath);
    const [animatedAreaPath, setAnimatedAreaPath] = useState(areaPath);
    const [animatedLastPoint, setAnimatedLastPoint] = useState(lastPoint);

    const prevLinePathRef = useRef(linePath);
    const prevAreaPathRef = useRef(areaPath);
    const prevLastPointRef = useRef(lastPoint);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {

        if (prevLinePathRef.current === linePath && prevAreaPathRef.current === areaPath) {
            return;
        }

        const lineInterpolator = d3.interpolateString(prevLinePathRef.current, linePath);
        const areaInterpolator = d3.interpolateString(prevAreaPathRef.current, areaPath);

        const startPoint = prevLastPointRef.current || lastPoint;
        const endPoint = lastPoint || prevLastPointRef.current;
        const pointInterpolator = startPoint && endPoint
            ? d3.interpolateObject(startPoint, endPoint)
            : () => lastPoint;

        const startTime = Date.now();
        const duration = 500;

        const animate = () => {
            const now = Date.now();
            let progress = (now - startTime) / duration;

            if (progress >= 1) {
                progress = 1;
                setAnimatedLinePath(linePath);
                setAnimatedAreaPath(areaPath);
                setAnimatedLastPoint(lastPoint);
                prevLinePathRef.current = linePath;
                prevAreaPathRef.current = areaPath;
                prevLastPointRef.current = lastPoint;
                return;
            }

            const easedProgress = d3.easeCubicInOut(progress);

            setAnimatedLinePath(lineInterpolator(easedProgress));
            setAnimatedAreaPath(areaInterpolator(easedProgress));

            const interpolatedPoint = pointInterpolator(easedProgress);
            if (interpolatedPoint) {
                setAnimatedLastPoint({
                    ...interpolatedPoint,
                    value: lastPoint?.value || interpolatedPoint.value
                });
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [linePath, areaPath, lastPoint]);

    return { animatedLinePath, animatedAreaPath, animatedLastPoint };
};

export default useChartAnimation;