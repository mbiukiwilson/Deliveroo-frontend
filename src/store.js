import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/authSlice";
import parcelReducer from "./features/parcelSlice";
import preferencesReducer from "./features/preferencesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    parcels: parcelReducer,
    preferences: preferencesReducer,
  },
});