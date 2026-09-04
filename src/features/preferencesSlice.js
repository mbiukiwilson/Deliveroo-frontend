import { createSlice } from "@reduxjs/toolkit";

const savedLanguage = localStorage.getItem("sendit_language") || "en";
const savedCurrency = localStorage.getItem("sendit_currency") || "KES";

const preferencesSlice = createSlice({
  name: "preferences",
  initialState: { language: savedLanguage, currency: savedCurrency },
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
      localStorage.setItem("sendit_language", action.payload);
    },
    setCurrency(state, action) {
      state.currency = action.payload;
      localStorage.setItem("sendit_currency", action.payload);
    },
  },
});

export const { setLanguage, setCurrency } = preferencesSlice.actions;
export default preferencesSlice.reducer;
