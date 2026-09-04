import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/authSlice";
import preferencesReducer from "./features/preferencesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    preferences: preferencesReducer,
  },
});

export default store;