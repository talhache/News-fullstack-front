import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../axios';

export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async () => {
        const { data } = await axios.get('/news');
        return data;
    });

    export const fetchTags = createAsyncThunk(
        'news/fetchTags',
        async () => {
            const { data } = await axios.get('/news/tags');
            return data;
        });

    export const fetchRemoveNews = createAsyncThunk('news/delete', async (id) => {
         axios.delete(`/news/${id}`);
         return id
    });

const initialState = {
    news: {
        items: [],
        status: "loading"
    },

    tags: {
        items: [],
        status: "loading"
    },
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Получение статей
        builder.addCase(fetchNews.pending, (state) => {
            state.news.items = [];
            state.news.status = 'loading';
        })
        .addCase(fetchNews.fulfilled, (state, action) => {
            state.news.items = action.payload;
            state.news.status = 'loaded';
        })
        .addCase(fetchNews.rejected, (state) => {
            state.news.items = [];
            state.news.status = 'error';
        })
        //Получение тегов
        .addCase(fetchTags.pending, (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        })
        .addCase(fetchTags.fulfilled, (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        })
        .addCase(fetchTags.rejected, (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        })
        //Удаление статей
        .addCase(fetchRemoveNews.pending, (state, action) => {
            state.news.status = 'loading' 
        })
        .addCase(fetchRemoveNews.fulfilled, (state, action) => {
            state.news.items = state.news.items.filter(obj => obj._id !== action.payload);
            state.news.status = 'loaded';
        })
       
       

    }
});

export const  newsReducer = newsSlice.reducer;