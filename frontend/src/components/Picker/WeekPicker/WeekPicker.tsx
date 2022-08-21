import { format, isValid, startOfWeek, endOfWeek } from "date-fns";
import { DatePicker, MuiPickersUtilsProvider, DatePickerProps } from "@material-ui/pickers";
import { IconButton, Box, Button } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons"
import React from 'react'
import DateFnsUtils from "@date-io/date-fns";
import { useStyles } from './WeekPicker.styles'
import { useWeekPicker } from './WeekPicker.hook'

interface WeekPickerProps {
  value?: Date
  nextDisabled?: boolean
  prevDisabled?: boolean
  onChange: (date: Date) => void
  inputClassName?: string
}

export const WeekPicker: React.FC<WeekPickerProps> = ({
  value,
  inputClassName,
  nextDisabled = false,
  prevDisabled = false,
  onChange
}) => {
  const classes = useStyles()
  const { 
    selectedDate, 
    renderWrappedWeekDayBuild, 
    handleChange,
    onNext,
    onPrev
  } = useWeekPicker({value, onChange})

  const renderWrappedWeekDay: DatePickerProps["renderDay"] = (date, selectedDate, dayInCurrentMonth) => {
    const { dateClone,dayClassName, wrapperClassName } = renderWrappedWeekDayBuild(date as Date, selectedDate as Date, dayInCurrentMonth, classes)
    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> {format(dateClone, "d")} </span>
        </IconButton>
      </div>
    );
  }

  const formatWeekSelectLabel: DatePickerProps["labelFunc"] = (date, invalidLabel) => {
    return date && isValid(date)
      ? `${format(startOfWeek(date, {weekStartsOn: 1}), "MMM d")} - ${format(endOfWeek(date, {weekStartsOn: 1}), "MMM d")}`
      : invalidLabel;
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box>
        {!prevDisabled && (
          <Button onClick={onPrev} variant="outlined" className={classes.btnPrevNext}>
            <ChevronLeft />
          </Button>
        )}
        <DatePicker
          value={selectedDate}
          onChange={handleChange}
          renderDay={renderWrappedWeekDay}
          labelFunc={formatWeekSelectLabel}
          className={classes.datePicker}
          InputProps={{
            disableUnderline: true,
            className: `${classes.datePickerInput} ${inputClassName}`
          }}
        />
        {!nextDisabled && (
          <Button onClick={onNext} variant="outlined" className={classes.btnPrevNext}>
            <ChevronRight />
          </Button>
        )}
      </Box>
    </MuiPickersUtilsProvider>
  );
}
