/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hook"
import { createShiftAsync, isLoading as isLoadingGetter, setTriggerSave } from "../../../features/shift/shiftSlice";

export const useShiftCreate = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(isLoadingGetter)
    const saveStatus = useAppSelector((state) => state.shift.saveStatus)
    const [submitting, setSubmitting] = useState(false)

    const onSubmit = async ({ name, date, startTime, endTime }: any) => {
        setSubmitting(true)
        const formattedDate = format(date!, "yyyy-MM-dd");
        const formattedStartTime = format(startTime!, "HH:mm");
        const formattedEndTime = format(endTime!, "HH:mm");

        const payload = {
            name,
            date: formattedDate,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
        };
        await dispatch(createShiftAsync(payload))
        setSubmitting(false)
    }
    const onSaveClick = () => dispatch(setTriggerSave(true))
    
    useEffect(() => {
        if(saveStatus === "idle" && submitting){
            history.push('/shift')
        }
    }, [saveStatus])

    return {
        isLoading,
        onSubmit,
        onSaveClick
    }
}