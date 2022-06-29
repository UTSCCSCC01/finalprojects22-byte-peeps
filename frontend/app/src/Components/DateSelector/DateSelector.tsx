import { useEffect, useRef, useState } from 'react'
// @ts-ignore
import { DateRange } from 'react-date-range'
import format from 'date-fns/format'
import { addDays } from 'date-fns'

import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { selectStartDate, selectEndDate, setStartDate, setEndDate, getCommentsSentimentAnalysis } from '../../Redux/Slices/facebook/facebookSlice'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import styles from './DateSelector.module.css'
import { Interface } from 'readline'

const DateSelector = () => {
  const dispatch = useAppDispatch();

  // date state
  const [range, setRange]: any = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: 'selection'
    }
  ])

  // open close
  const [open, setOpen] = useState(false)

  // get the target element to toggle 
  const refOne: any = useRef(null)

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  useEffect(() => {
    console.log("In useeffect:", range);
    // if (range.startDate && range.endDate) {
        console.log("dispatch changes", range[0].startDate?.toISOString());
        dispatch(setStartDate(range[0].startDate?.toISOString()));
        dispatch(setEndDate(range[0].endDate?.toISOString()));
        dispatch(getCommentsSentimentAnalysis());
        console.log("dispatched");
    // }
  }, [range, dispatch, range.startDate, range.endDate])

  // hide dropdown on ESC press
  const hideOnEscape = (e: any) => {
    // console.log(e.key)
    if( e.key === "Escape" ) {
      setOpen(false)
    }
  }

  // Hide on outside click
  const hideOnClickOutside = (e: any) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
    }
  }

  return (
    <div className={styles.calendarWrap}>
      <input
        value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")}`}
        readOnly
        className={styles.inputBox}
        onClick={ () => setOpen(open => !open) }
      />

      <div ref={refOne}>
        {open && 
          <DateRange
            onChange={(item: any) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className={styles.calendarElement}
          />
        }
      </div>
    </div>
  )
}

export default DateSelector