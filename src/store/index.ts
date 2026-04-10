import { configureStore, createSlice } from '@reduxjs/toolkit'

let pageDataSlices = createSlice({
    name: 'pageData',
    initialState: {
        path: "",
        storeDataList: [],
        currentData: {}
    },
    reducers: {
        setPath: (state, action) => {
            state.path = action.payload;
        },
        setStoreDataList: (state, action) => {
            state.storeDataList = action.payload;
        },
        setCurrentData: (state, action) => {
            state.currentData = action.payload;
        },
    }
})

const store = configureStore({
	reducer: {
        pageData: pageDataSlices.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const {setPath, setStoreDataList, setCurrentData} = pageDataSlices.actions;

export default store;