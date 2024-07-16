import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearCart, fetchCartItems } from "./cartSlice";
import {
    getUserApi,
    registerUserApi,
    signInUserApi,
    updateUserProfileApi,
    userLogout
} from "../Services/userServices";

// Async thunks
export const getUser = createAsyncThunk('user/get-user', async (_, thunkAPI) => {
    try {
        const response = await getUserApi();
        return response.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const registerUser = createAsyncThunk('user/register', async (userData, thunkAPI) => {
    try {
        const response = await registerUserApi(userData);
        localStorage.setItem('token', response.token);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const signInUser = createAsyncThunk('user/signIn', async (userData, thunkAPI) => {
    try {
        const response = await signInUserApi(userData);
        localStorage.setItem('token', response.token);
        await thunkAPI.dispatch(getUser());
        await thunkAPI.dispatch(fetchCartItems());
        return response.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateProfile = createAsyncThunk('user/profile', async (userProfile, thunkAPI) => {
    try {
        const response = await updateUserProfileApi(userProfile);
        await thunkAPI.dispatch(getUser());
        return response.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'An error occurred');
    }
});

export const logoutUser = createAsyncThunk('user/logout', async (_, thunkAPI) => {
    try {
        await userLogout();
        localStorage.removeItem('token');
        await thunkAPI.dispatch(clearCart());
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// Initial state
const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

// Slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => { state.loading = true; })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signInUser.pending, (state) => { state.loading = true; })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUser.pending, (state) => { state.loading = true; })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProfile.pending, (state) => { state.loading = true; })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.pending, (state) => { state.loading = true; })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
