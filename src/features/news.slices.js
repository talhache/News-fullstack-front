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

    }
});

export const  newsReducer = newsSlice.reducer;