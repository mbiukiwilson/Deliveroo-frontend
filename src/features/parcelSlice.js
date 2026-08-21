import { createSlice } from "@reduxjs/toolkit";

const parcelSlice = createSlice({
  name: "parcels",
  initialState: {
    items: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    setParcels(state, action) {
      state.items = action.payload;
    },
    setSelectedParcel(state, action) {
      state.selected = action.payload;
    },
  },
});

export const { setParcels, setSelectedParcel } = parcelSlice.actions;
export default parcelSlice.reducer;
