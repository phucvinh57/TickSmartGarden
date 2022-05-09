import { createSlice } from "@reduxjs/toolkit";

const gardenSlice = createSlice({
    name: "garden",
    initialState: [],
    reducers: {
        addGarden: (state, action) => {
            state.push(action.payload)
            return state
        },
        initGardenList: (state, action) => {
            console.log(action.type)
            state = action.payload;
            return state
        }
    }
})

export const {addGarden, initGardenList} = gardenSlice.actions;
export default gardenSlice.reducer;