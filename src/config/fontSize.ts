import { normalizeFont } from "./normalize";

enum FontSize {
    XS = normalizeFont(10),
    S = normalizeFont(12),
    SM = normalizeFont(13),
    MD = normalizeFont(14),
    L = normalizeFont(20),
    XL = normalizeFont(24),
}

export default FontSize;