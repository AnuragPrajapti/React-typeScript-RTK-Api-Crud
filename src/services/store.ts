import { configureStore } from "@reduxjs/toolkit";
import { callApiMethods } from "./createSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
     reducer : {
        [callApiMethods.reducerPath] : callApiMethods.reducer,
     },
    middleware :  (getDefaultMiddleware) => getDefaultMiddleware().concat(callApiMethods.middleware)
})

setupListeners(store.dispatch)