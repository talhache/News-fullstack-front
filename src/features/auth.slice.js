import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios';

export const fectcUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
    const { data } = await axios.post('/login', params); 
    return data;
});

export const fetchLogMe =  createAsyncThunk('auth/fetchLogMe', async () => {
    const { data } = await axios.get('/Mypage'); 
    return data;
});

export const fetchRegister =  createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/registration', params); 
    return data;
});


const initialState = {
    data: null, 
    status: 'loading',
};

const authSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            state.status = 'loaded';
        }
    },
    extraReducers:(builder) => 
    builder.addCase(fectcUserData.pending, (state) => {
        state.status = 'loading';
        state.data = null;
    })
    .addCase(fectcUserData.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
    })
    .addCase(fectcUserData.rejected, (state) => {
        state.status = 'error';
        state.data = null;
    })
    .addCase(fetchLogMe.pending, (state) => {
        state.status = 'loading';
        state.data = null;
    })
    .addCase(fetchLogMe.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
    })
    .addCase(fetchLogMe.rejected, (state) => {
        state.status = 'error';
        state.data = null;
    })
    .addCase(fetchRegister.pending, (state) => {
        state.status = 'loading';
        state.data = null;
    })
    .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
    })
    .addCase(fetchRegister.rejected, (state) => {
        state.status = 'error';
        state.data = null;
    })
});

export const selectIsAuth = (state) => Boolean(state.login.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
      
