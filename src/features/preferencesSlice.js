import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "en",
  currency: "KES",
};

const preferencesSlice = createSlice({
  name: "preferences",

  initialState,

  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },

    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { setLanguage, setCurrency } = preferencesSlice.actions;

export default preferencesSlice.reducer;