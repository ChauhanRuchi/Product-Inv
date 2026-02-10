import api from '@/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (params: any, { rejectWithValue }) => {
    try {
      return await api.get('/products', { params });
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);


export const addProduct = createAsyncThunk(
  'products/add',
  async (data: any, { rejectWithValue }) => {
    try {
      return await api.post('/products', data);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);


export const removeProduct = createAsyncThunk(
  'products/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/products/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);


const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: [] as any[],
    total: 0,
    page: 1,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      /* FETCH */
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action:any) => {
        state.loading = false;
        state.list = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ADD */
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      /* DELETE */
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (p: any) => p.id !== action.payload,
        );
      });
  },
});

export default productSlice.reducer;
