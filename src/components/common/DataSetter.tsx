'use client';

import { AppDispatch, setCurrentData, setPath, setStoreDataList } from "@/store";
import { useDispatch } from "react-redux";

interface DataSetterProps {
    path?: string;
    storeDataList?: any[];
    currentData?: any;
}

function DataSetter({ path, storeDataList, currentData } : DataSetterProps) {
    const dispatch : AppDispatch = useDispatch();

    if (path) {
        dispatch(setPath(path))
    }

    if (storeDataList) {
        dispatch(setStoreDataList(storeDataList))
    }

    if (currentData) {
        dispatch(setCurrentData(currentData))
    }

    return (
        <></>
    )
}

export default DataSetter;