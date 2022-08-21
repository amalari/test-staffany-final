/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { format } from "date-fns";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hook"
import { findShiftByIdAsync, isLoading as isLoadingGetter, setTriggerSave, updateShiftByIdAsync } from "../../../features/shift/shiftSlice";

export const useShiftUpdate = () => {
    const history = useHistory();
    const { id } = useParams<{id?: string}>();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(isLoadingGetter)
    const saveStatus = useAppSelector((state) => state.shift.saveStatus)
    const selectedShift = useAppSelector((state) => state.shift.selectedShift)
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [initValues, setInitValues] = useState<any>({})

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
        await dispatch(updateShiftByIdAsync({ id: id as string, payload}))
        setSubmitting(false)
    }
    const onSaveClick = () => dispatch(setTriggerSave(true))
    
    useEffect(() => {
        if(saveStatus === "idle" && submitting){
            history.push('/shift')
        }
    }, [saveStatus])

    useEffect(() => {
        dispatch(findShiftByIdAsync(id as string))
    },[])

    useEffect(() => {
        if(selectedShift){
            setInitValues({
                name: selectedShift.name,
                date: selectedShift.date,
                startTime: format(new Date(), "yyyy-MM-dd") + " " + selectedShift.startTime,
                endTime: format(new Date(), "yyyy-MM-dd") + " " + selectedShift.endTime,
            })
        }
    }, [selectedShift])

    return {
        isLoading,
        initValues,
        onSubmit,
        onSaveClick
    }
}