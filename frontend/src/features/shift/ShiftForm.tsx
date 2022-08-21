import React from 'react'
import DateFnsUtils from "@date-io/date-fns";
import {
    CircularProgress,
    Grid,
    TextField,
} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import { AccessTime } from "@material-ui/icons";
import { useShiftForm, FormData } from './ShiftForm.hook';

interface ShiftFormProps {
    isLoading: boolean
    onSubmit: (data: any) => void
    initValues: FormData
}
  
const ShiftForm: React.FC<ShiftFormProps> = ({
    onSubmit,
    initValues,
    isLoading
}) => {
    const {
        watchName,
        watchDate,
        watchEndTime,
        watchStartTime,
        errors,
        handleNameChange,
        handleDateChange,
        handleStartTimeChange,
        handleEndTimeChange,
    } = useShiftForm({
        onSubmit,
        initValues
    })

    return (
        <form>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Shift Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={watchName}
                        onChange={handleNameChange}
                        error={errors.name !== undefined}
                        helperText={errors.name?.message}
                    />
                    </Grid>
                    <Grid item xs={4}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                id="date"
                                name="date"
                                label="Event date"
                                format="dd.MM.yyyy"
                                disablePast
                                margin="normal"
                                disableToolbar
                                fullWidth
                                value={watchDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                                error={errors.hasOwnProperty("date")}
                                helperText={errors.date && errors.date.message}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={4}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                            ampm={false}
                            margin="normal"
                            id="startTime"
                            label="Start Time"
                            name="startTime"
                            value={watchStartTime}
                            onChange={handleStartTimeChange}
                            KeyboardButtonProps={{
                                "aria-label": "change time",
                            }}
                            error={errors.hasOwnProperty("startTime")}
                            helperText={
                                errors.startTime && errors.startTime.message
                            }
                            keyboardIcon={<AccessTime />}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={4}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                            ampm={false}
                            margin="normal"
                            id="endTime"
                            label="End Time"
                            name="endTime"
                            value={watchEndTime}
                            onChange={handleEndTimeChange}
                            KeyboardButtonProps={{
                                "aria-label": "change time",
                            }}
                            error={errors.hasOwnProperty("endTime")}
                            helperText={errors.endTime && errors.endTime.message}
                            keyboardIcon={<AccessTime />}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
            )}
        </form>
    )
}

export default ShiftForm;