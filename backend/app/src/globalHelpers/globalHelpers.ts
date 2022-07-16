import { Dates } from './globalTypes';

export function getDates(
  startDateString: string | undefined,
  endDateString: string | undefined
): Dates {
  const nullReturn = { startDate: null, endDate: null };

  if (!startDateString || !endDateString) return nullReturn;

  if (
    !startDateString.match('[0-9]+') ||
    startDateString.length !== 8 ||
    !endDateString.match('[0-9]+') ||
    endDateString.length !== 8
  )
    return nullReturn;

  const startYear = parseInt(startDateString.substring(0, 4));
  const startMonth = parseInt(startDateString.substring(4, 6));
  const startDay = parseInt(startDateString.substring(6, 8));
  const startDate = new Date(startYear, startMonth - 1, startDay);

  const endYear = parseInt(endDateString.substring(0, 4));
  const endMonth = parseInt(endDateString.substring(4, 6));
  const endDay = parseInt(endDateString.substring(6, 8));
  const endDate = new Date(endYear, endMonth - 1, endDay + 1);

  return { startDate, endDate };
}
