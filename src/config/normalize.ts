import { Dimensions, PixelRatio } from 'react-native';

export const { width: winW, height: winH } = Dimensions.get('window');

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

export const width = winH > winW ? winW : winH;
export const height = winW > winH ? winW : winH;

export const normalizeFont = (size: number) => {
    const scaleWidth = width / BASE_WIDTH;
    const scaleHeight = height / BASE_HEIGHT;
    const scale = Math.min(scaleWidth, scaleHeight);

    const newSize = size * scale;

    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const normalizeBasic = (size: number) => {
    const scale = width / 375;
    const result = PixelRatio.roundToNearestPixel(size * scale);
    normalizeProxy[size] = result;
    return result;
};

const normalizeProxy: any = {};

for (let i = 0.5; i < 100; i++) {
    normalizeBasic(i);
}

export const normalize = (i: number) => normalizeProxy[i] || normalizeBasic(i);
