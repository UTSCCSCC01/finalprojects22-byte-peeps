export default function getStartEndDate(startDateParam: string, endDateParam: string): [Date, Date] {
    const year = parseInt((startDateParam).substring(0, 4));
    const month = parseInt((startDateParam).substring(4, 6));
    const day = parseInt((startDateParam).substring(6, 8));

    const year_end = parseInt((endDateParam).substring(0, 4));
    const month_end = parseInt((endDateParam).substring(4, 6));
    const day_end = parseInt((endDateParam).substring(6, 8));

    const startDate = new Date(year, month - 1, day);
    const endDate = new Date(year_end, month_end - 1, day_end + 1);
    return [startDate, endDate]
}