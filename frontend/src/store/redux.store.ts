import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./features/user/user_slice";

export const store = configureStore({
    reducer: {
        user: userReducer,
    }
});

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;