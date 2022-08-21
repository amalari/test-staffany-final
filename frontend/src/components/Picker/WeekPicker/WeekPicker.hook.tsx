import { useState, useEffect } from 'react'
import { DatePickerProps } from "@material-ui/pickers";
import clsx from "clsx";
import {
  isSameDay,
  startOfWeek,
  endOfWeek,
  isWithinInterval
} from "date-fns"
import { useStyles } from './WeekPicker.style'

interface UseWeekPickerProps {
  value?: Date
  onChange: (date: Date) => void
}

export const useWeekPicker = ({
  value,
  onChange
}: UseWeekPickerProps) => {
  // states
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  // method
  const renderWrappedWeekDayBuild = (
    date: Date, 
    selectedDate: Date, 
    dayInCurrentMonth: boolean,
    classes: ReturnType<typeof useStyles>
  ) => {
    const dateClone = date;
    const selectedDateClone = selectedDate;

    const start = startOfWeek(selectedDateClone, {weekStartsOn: 1});
    const end = endOfWeek(selectedDateClone, {weekStartsOn: 1});

    const dayIsBetween = isWithinInterval(dateClone, { start, end });
    const isFirstDay = isSameDay(dateClone, start);
    const isLastDay = isSameDay(dateClone, end);

    const wrapperClassName = clsx({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay,
    });

    const dayClassName = clsx(classes.day, {
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
    });

    return { wrapperClassName, dayClassName, dateClone }
  }

  const handleChange: DatePickerProps["onChange"] = (date) => {
    setSelectedDate(date as Date)
    onChange(date as Date)
  }

  const onPrev = () => {
    const date = new Date(selectedDate.getTime())
    date.setDate(date.getDate() - 7)

    setSelectedDate(date)
    onChange(date as Date)
  }
  const onNext = () => {
    const date = new Date(selectedDate.getTime())
    date.setDate(date.getDate() + 7)

    setSelectedDate(date)
    onChange(date as Date)
  }

  // effects
  useEffect(() => {
    if(value) setSelectedDate(value)
  }, [value])

  return {
    selectedDate,
    renderWrappedWeekDayBuild,
    handleChange,
    onPrev,
    onNext
  } 
}