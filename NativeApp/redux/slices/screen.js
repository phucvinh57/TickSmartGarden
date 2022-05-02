import { createSlice } from "@reduxjs/toolkit";

const screenSlice = createSlice({
    name: "screen",
    initialState: 0,
    reducers: {
        modifyScreen: (state, action) => {
            state = action.payload;
            return state
        }
    }
})

export const {modifyScreen} = screenSlice.actions
export default screenSlice.reducer;