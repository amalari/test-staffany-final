/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getShiftsAsync, startEndDateFilter, isLoading as isLoadingGetter, deleteShiftByIdAsync, deleteById } from "../../features/shift/shiftSlice";
import { RootState } from "../../store/store";
import { setMessage } from "../../features/alert/alertSlice";

export const useShift = () => {
    // third party
    const dispatch = useAppDispatch();
    const shiftsData = useAppSelector((state: RootState) => state.shift.shifts);
    const startEndDateFilterData = useAppSelector(startEndDateFilter);
    const dateFilter = useAppSelector((state: RootState) => state.shift.dateFilter)
    const isLoading = useAppSelector(isLoadingGetter)

    // states
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  
    // methods
    const onDeleteClick = (id: string) => {
      setSelectedId(id);
      setShowDeleteConfirm(true);
    };
    const onCloseDeleteDialog = () => {
      setSelectedId(null);
      setShowDeleteConfirm(false);
    };
    const handleDelete = async () => {
        setDeleteLoading(true)
        dispatch(deleteShiftByIdAsync(selectedId as string));
        dispatch(deleteById(selectedId as string))
        setSelectedId(null);
        setDeleteLoading(false)
        onCloseDeleteDialog();
    };
  
    //effects
    useEffect(() => {
        dispatch(getShiftsAsync(startEndDateFilterData));
    }, [dateFilter]);

    useEffect(() => {
        dispatch(setMessage(''))
    }, [])

    return {
        rows: shiftsData,
        isLoading,
        showDeleteConfirm,
        deleteLoading,
        onDeleteClick,
        handleDelete,
        onCloseDeleteDialog,
    }
}   