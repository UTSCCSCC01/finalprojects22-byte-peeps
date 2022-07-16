import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import format from 'date-fns/format';
import { DateRange, RangeKeyDict } from 'react-date-range';

import { useAppDispatch, useAppSelector } from '../../Redux/hooks';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {
  createDate,
  formatDate,
  selectEndDate,
  selectStartDate,
  setEndDate,
  setStartDate,
} from '../../Redux/Slices/dateSelector/dateSelectorSlice';
import styles from './DateSelector.module.css';

type Range = {
  startDate: Date;
  endDate: Date;
  key: 'selection';
};

let clicks = 0;

const DateSelector = () => {
  const dispatch = useAppDispatch();

  const startDate = useAppSelector(selectStartDate);
  const endDate = useAppSelector(selectEndDate);

  const [range, setRange] = useState<Range>({
    startDate: createDate(startDate) ?? new Date(),
    endDate: createDate(endDate) ?? new Date(),
    key: 'selection',
  });

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne: any = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e: any) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e: any) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  /**
   * Handles the date range selection
   * @param {RangeKeyDict} selectionRange - the selected range from the date range picker
   */
  function handleSelectionChange(selectionRange: RangeKeyDict): void {
    setRange(selectionRange.selection as Range);

    clicks += 1;

    if (clicks > 2) clicks = 1;

    if (clicks === 2) {
      dispatch(setStartDate(formatDate(selectionRange.selection.startDate)));
      dispatch(setEndDate(formatDate(selectionRange.selection.endDate)));
    }
  }

  return (
    <div className={styles.calendarWrap} ref={refOne}>
      <input
        value={`${format(range.startDate, 'MM/dd/yyyy')} to ${format(
          range.endDate,
          'MM/dd/yyyy'
        )}`}
        readOnly
        className={styles.inputBox}
        onClick={() => setOpen(!open)}
      />

      {open && (
        <DateRange
          onChange={handleSelectionChange}
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          ranges={[range]}
          months={1}
          direction="horizontal"
          className={styles.calendarElement}
        />
      )}
    </div>
  );
};

export default DateSelector;
