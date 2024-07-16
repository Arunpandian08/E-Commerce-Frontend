import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    fetchAllElectronics,
    fetchFurnitures,
    fetchLaptop,
    fetchMensCollection,
    fetchMobiles,
    fetchTelevisions,
    fetchWatch,
    fetchWomensCollection
} from "../Services/ProductServices";

// Async Thunks
export const getAllElectronics = createAsyncThunk(
    'products/getAllElectronics',
    async (_, thunkAPI) => {
        try {
            const response = await fetchAllElectronics();
            return response.ElectronicsData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });

export const getMensProducts = createAsyncThunk(
    'products/getMensProducts',
    async (_, thunkAPI) => {
        try {
            const response = await fetchMensCollection();
            return response.MensProductData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });

export const getWomensProducts = createAsyncThunk(
    'products/getWomensProducts',
    async (_, thunkAPI) => {
        try {
            const response = await fetchWomensCollection();
            return response.WomensProductData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });

export const getFurnitures = createAsyncThunk(
    'products/getFurnitures',
    async (_, thunkAPI) => {
        try {
            const response = await fetchFurnitures();
            return response.FurnitureProductData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });

// Filtered Electronic products
export const getMobiles = createAsyncThunk(
    'products/getMobiles',
    async (_, thunkAPI) => {
        try {
            const response = await fetchMobiles();
            return response.mobilesData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });

export const getTelevisions = createAsyncThunk(
    'products/getTelevisions',
    async (_, thunkAPI) => {
        try {
            const response = await fetchTelevisions();
            return response.televisionData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });

export const getLaptops = createAsyncThunk(
    'products/getLaptops',
    async (_, thunkAPI) => {
        try {
            const response = await fetchLaptop();
            return response.laptopData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });

export const getAndroidWatches = createAsyncThunk(
    'products/getAndroidWatches',
    async (_, thunkAPI) => {
        try {
            const response = await fetchWatch();
            return response.androidWatchData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });

// Initial state
const initialState = {
    productsData: {
        allElectronics: [],
        mensProducts: [],
        womensProducts: [],
        furnitures: [],
        mobiles: [],
        televisions: [],
        laptops: [],
        androidWatches: [],
    },
    isLoading: false,
    error: null
};

// Slice
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle getAllElectronics
            .addCase(getAllElectronics.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllElectronics.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productsData.allElectronics = action.payload;
                state.error = null;
            })
            .addCase(getAllElectronics.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Handle getMensProducts
            .addCase(getMensProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMensProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productsData.mensProducts = action.payload;
                state.error = null;
            })
            .addCase(getMensProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Handle getWomensProducts
            .addCase(getWomensProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getWomensProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productsData.womensProducts = action.payload;
                state.error = null;
            })
            .addCase(getWomensProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Handle getFurnitures
            .addCase(getFurnitures.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFurnitures.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productsData.furnitures = action.payload;
                state.error = null;
            })
            .addCase(getFurnitures.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Handle getMobiles
            .addCase(getMobiles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMobiles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productsData.mobiles = action.payload;
                state.error = null;
            })
            .addCase(getMobiles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Handle getTelevisions
            .addCase(getTelevisions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTelevisions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productsData.televisions = action.payload;
                state.error = null;
            })
            .addCase(getTelevisions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Handle getLaptops
            .addCase(getLaptops.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLaptops.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productsData.laptops = action.payload;
                state.error = null;
            })
            .addCase(getLaptops.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Handle getAndroidWatches
            .addCase(getAndroidWatches.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAndroidWatches.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productsData.androidWatches = action.payload;
                state.error = null;
            })
            .addCase(getAndroidWatches.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default productSlice.reducer;
