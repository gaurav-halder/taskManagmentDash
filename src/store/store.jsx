import { configureStore } from "@reduxjs/toolkit";
import sliceReducer from "./slice";

const store = configureStore({
    reducer: {
        tasks: sliceReducer,
    },
});
export default store;