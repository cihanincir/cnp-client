import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./types";
import { PayloadAction } from "@reduxjs/toolkit/react";
import { RootState } from "@/Store";

export const UserReducer = createSlice({
    name: "user",
    initialState: {} as IUser,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state = action.payload;
            return state;
        }
    }
});

export const { setUser } = UserReducer.actions;
export const USER_SELECTOR = (state: RootState) => state.user;