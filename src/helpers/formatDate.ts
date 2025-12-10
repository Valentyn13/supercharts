const formatTabLabel = (dateString: string) => {
    const [y, m, d] = dateString.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isSameDate = (d1: Date, d2: Date) =>
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear();

    if (isSameDate(date, today)) return "TODAY";
    if (isSameDate(date, yesterday)) return "YESTERDAY";

    const dayStr = String(d).padStart(2, '0');
    const monthStr = String(m).padStart(2, '0');
    return `${dayStr}/${monthStr}/${y}`;
};

export default formatTabLabel;
