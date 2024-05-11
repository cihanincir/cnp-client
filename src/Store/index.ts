import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { UserReducer } from "./Reducers/User";

const reducer = combineReducers({
    [UserReducer.name]: UserReducer.reducer
});

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;