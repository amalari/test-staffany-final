/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    format,
    startOfWeek,
    endOfWeek,
  } from "date-fns"  
import { getErrorMessage } from "../../helper/error/index";
import { deleteShiftById, getShifts, publishShifts } from "../../helper/api/shift";

export const useShift = () => {
    // third party
    const history = useHistory();

    // states
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>("");
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [dateFilter, setDateFilter] = useState<Date>(new Date())
    const [publishedAt, setPublishedAt] = useState<string | null>(null)
  
    // methods
    const onCreate = () => history.push("/shift/add")
    const onDeleteClick = (id: string) => {
      setSelectedId(id);
      setShowDeleteConfirm(true);
    };
    const onCloseDeleteDialog = () => {
      setSelectedId(null);
      setShowDeleteConfirm(false);
    };
    const onPublish = async () => {
        await publishShifts({
            startDate: format(startOfWeek(dateFilter, {weekStartsOn: 1}), "yyyy-MM-dd"),
            endDate: format(endOfWeek(dateFilter, {weekStartsOn: 1}), "yyyy-MM-dd")
        });

        getData();
    }
    const deleteDataById = async () => {
        try {
          setDeleteLoading(true);
          setErrMsg("");
    
          if (selectedId === null) {
            throw new Error("ID is null");
          }
          await deleteShiftById(selectedId);
    
          const tempRows = [...rows];
          const idx = tempRows.findIndex((v: any) => v.id === selectedId);
          tempRows.splice(idx, 1);
          setRows(tempRows);
        } catch (error) {
          const message = getErrorMessage(error);
          setErrMsg(message);
        } finally {
          setDeleteLoading(false);
          onCloseDeleteDialog();
        }
    };
    const getData = async () => {
        try {
          setIsLoading(true);
          setErrMsg("");
          const { results } = await getShifts({
            startDate: format(startOfWeek(dateFilter, {weekStartsOn: 1}), "yyyy-MM-dd"),
            endDate: format(endOfWeek(dateFilter, {weekStartsOn: 1}), "yyyy-MM-dd")
          });
          if(results.length > 0 && results[0].publishedAt){
            setPublishedAt(results[0].publishedAt)
          } else {
            setPublishedAt(null)
          }
          setRows(results);
        } catch (error) {
          const message = getErrorMessage(error);
          setErrMsg(message);
        } finally {
          setIsLoading(false);
        }
    };
    const onDateFilterChange = (date: Date) => {
        setDateFilter(date)
    }
  
    // effects
    useEffect(() => {
      getData();
    }, [dateFilter]);
      
    return {
        errMsg,
        rows,
        isLoading,
        showDeleteConfirm,
        deleteLoading,
        publishedAt,
        onDeleteClick,
        onPublish,
        deleteDataById,
        onCloseDeleteDialog,
        onCreate,
        onDateFilterChange
    }
}   