/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { RootState } from '../../store/store';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setTriggerSave } from './shiftSlice';

const formSchema = Joi.object({
    name: Joi.string().required(),
    date: Joi.date().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().greater(Joi.ref("startTime")).required(),
});

export interface FormData {
    name: string | null;
    date: Date | null;
    startTime: Date | null;
    endTime: Date | null;
}

interface UseShiftFormProps {
    onSubmit: (data: any) => void
    initValues: FormData
}

export const useShiftForm = ({
    onSubmit,
    initValues
}: UseShiftFormProps) => {
    const { register, handleSubmit, errors, setValue, watch } = useForm<FormData>(
        {
          resolver: joiResolver(formSchema),
          defaultValues: initValues,
        }
    );
    const dispatch = useAppDispatch();
    const triggerSave = useAppSelector((state: RootState) => state.shift.triggerSave);
    const watchName = watch("name", "");
    const watchDate = watch("date", initValues.date);
    const watchStartTime = watch("startTime", initValues.startTime);
    const watchEndTime = watch("endTime", initValues.endTime);

    const handleNameChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setValue("name", e.target.value);
    }
    const handleDateChange = (date: Date | null) => {
        setValue("date", date);
    };
    const handleStartTimeChange = (v: Date | null) => {
        setValue("startTime", v);
    };
    const handleEndTimeChange = (v: Date | null) => {
        setValue("endTime", v);
    };
    const handleSubmitData = handleSubmit(onSubmit)

    useEffect(() => {
        register({ name: "name", type: "text" });
        register({ name: "date", type: "text" });
        register({ name: "startTime", type: "text" });
        register({ name: "endTime", type: "text" });
    }, [])

    useEffect(() => {
        if(triggerSave){
            handleSubmitData()
            dispatch(setTriggerSave(false))
        }
    }, [triggerSave])
    
    return {
        watchName,
        watchDate,
        watchEndTime,
        watchStartTime,
        errors,
        handleNameChange,
        handleDateChange,
        handleStartTimeChange,
        handleEndTimeChange,
        handleSubmitData
    }
}