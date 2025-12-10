import { normalize } from './normalize';

const Size = {
    xs: normalize(4),
    s: normalize(8),
    mid: normalize(10),
    m: normalize(12),
    l: normalize(16),
    xl: normalize(20),
    xxl: normalize(25),
    xxxl: normalize(40),
    jumbo: normalize(50),
    p7: normalize(7),
    p15: normalize(15),
    borderRadiusS: normalize(12),
    borderRadiusM: normalize(16),
    lineHeightS: normalize(18),
    graphDefaultHeight: normalize(173),
    graphHeightLarge: normalize(240),
    graphDefaultWidth: normalize(370),
    graphPadding: normalize(20),
    strokeWidthS: 2,
    strokeWidthM: 4,
};

export default Size;