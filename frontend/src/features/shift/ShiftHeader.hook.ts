import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { publishShiftsAsync, setDateFilter, setPublishedAt } from "./shiftSlice";

export const useShiftHeader = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const publishedAt = useAppSelector((state) => state.shift.publishedAt)
    const dateFilter = useAppSelector((state) => state.shift.dateFilter)

    // methods
    const onCreate = () => history.push("/shift/add")
    const onDateFilterChange = (date: Date) => {
        dispatch(setDateFilter(date.toISOString()))
    }
    const onPublish = () => {
        dispatch(setPublishedAt(new Date().toISOString()))
        dispatch(publishShiftsAsync())
    }

    return {
        onCreate,
        onDateFilterChange,
        onPublish,
        publishedAt,
        dateFilter
    }
}