import { configureStore } from "@reduxjs/toolkit";
import  { newsReducer } from "../features/news.slices";
import { authReducer } from "../features/auth.slice";


 const store = configureStore({
    reducer: {
        news: newsReducer,
        login: authReducer
    }
});

export default store;
