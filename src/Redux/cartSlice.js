import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addProductsToCartApi,
    clearCartProductsApi,
    fetchCartProductsApi,
    removeFromCartApi,
} from "../Services/cartServices";


// Fetch cart items
export const fetchCartItems = createAsyncThunk(
    "cart/fetchItems",
    async (_, thunkAPI) => {
        try {
            const products = await fetchCartProductsApi();
            return products;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to fetch cart items" }
            );
        }
    }
);

// Add to cart
export const addToCart = createAsyncThunk(
    "add/cart",
    async ({ _id, category }, thunkAPI) => {
        try {
            await addProductsToCartApi({ _id, category });
            
            const products = await fetchCartProductsApi();
            return products;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Remove from cart
export const removeFromCart = createAsyncThunk(
    "remove/cart",
    async (productId, thunkAPI) => {
        try {
            await removeFromCartApi(productId);
            const products = await fetchCartProductsApi();
            return products;

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to remove from cart" }
            );
        }
    }
);

//Delete all cart products
export const clearCartProducts = createAsyncThunk(
    'delete/All cart products',
    async (_, thunkAPI) => {
        try {
             await clearCartProductsApi()
             const products = await fetchCartProductsApi();
             return products;
 
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || { message: 'Failed to clear cart' })
        }
    }
)

const initialState = {
    items: [],
    totalCount: 0,
    isLoading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.items = [];
            state.totalCount = 0;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
                state.totalCount = action.payload.reduce((acc, item) => acc + item.quantity, 0);
                state.error = null;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || action.error.message || "Fetch cart items failed";
            })
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
                state.totalCount = action.payload.reduce((acc, item) => acc + item.quantity, 0);
                state.error = null;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || action.error.message || "Add to cart failed";
            })
            .addCase(removeFromCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
                state.totalCount = action.payload.reduce((acc, item) => acc + item.quantity, 0);
                state.error = null;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || action.error.message || "Remove from cart failed";
            })
            .addCase(clearCartProducts.pending, state => {
                state.isLoading = true;
            })
            .addCase(clearCartProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
                state.totalCount = action.payload.reduce((acc, item) => acc + item.quantity, 0);
                state.error = null;
            })
            .addCase(clearCartProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message || action.error.message || "Clear All products from cart failed";
            })
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
