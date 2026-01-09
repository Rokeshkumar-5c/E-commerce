import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Product, ProductStatus } from "../shared/types";
import { productsApi } from "../shared/services/api/productsApi";
import { InFlightStatuses, ProductsInFlightNames, type InFlightStatus } from "../shared/types/inFlight.types";

interface ProductsState {
  items: Product[];
  status: ProductStatus;
  error: string | null;
  inFlights: {
    [ProductsInFlightNames.fetchProductsInFlight]: InFlightStatus;
    [ProductsInFlightNames.fetchProductByIdInFlight]: InFlightStatus;
  };
}

// Mock data - will be replaced with API calls
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Marble Desk Set",
    price: "$45.00",
    originalPrice: "$60.00",
    rating: 4.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwHEmZnb8wldUWF_qDiiGR7ktwybiTHKcFbJtrbhHQZcJglo7g9pVrtBTo9z6_qmsljIeUmSAM5AP7dY4SBx0yLNt-Aq7Yv2V4qw6oGmz63kuXjBljKo57x-aqp5Xu0RGZCTIAV4yarqOTC92Aboze-GRH5oG_doowhyDYouaRyFpi7QNtwKdmkMw-5Si6THb8gYRUtgqZzVS8TQ7FNIRdyrlLR0hSju27AC-J8GXAD8hPilJQHiWi5ow1q62qF_RUwnsFX0zuZuM",
    category: "Desk Accessories",
    collection: "STATIONERY COLLECTION",
    sku: "CE-BR-001",
    stock: 4,
    description: "A timeless piece to elevate your workspace. Hand-polished brass sphere mounted on a solid marble base, designed to inspire creativity and focus.",
    finishes: [
      { name: "Polished Gold", color: "#D4AF37" },
      { name: "Silver", color: "#C0C0C0" },
      { name: "Black", color: "#000000" },
    ],
    details: "Crafted from solid brass with a mirror-polished finish, this ornament sits atop a genuine Carrara marble base. It serves as both a paperweight and a striking visual anchor for your desk.",
    specifications: 'Material: Solid Brass, Marble Base | Dimensions: 3" x 3" x 2" | Weight: 0.5 lbs | Finish: Mirror Polished',
    shippingReturns: "Free shipping on orders over $50. Standard shipping takes 3-5 business days. Returns accepted within 30 days of purchase. Items must be in original condition.",
  },
  {
    id: "2",
    name: "Abstract Bronze Form",
    price: "$120.00",
    rating: 5.0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnrhv3WPKmB_m1f3Pg8Yb3W3ahsihVJSM6c_fACD3v4jYTlOpLQiw-RPXtxkQfCHWw4QtoSOBMvlRG4z4Eyq1treF-64lMB-JaAoa7oJYWX0GpWuoJbR4Bw0RHGt0eS2qp87b8OeaeVhs40tvrcOeGcBrs6NLQQ9QHpNv4T5DVX3_yEGfUqhigspZap8XYw5GriH8jGtPkKjoP1HltjLFDmGvAvTjttntgk3HcKmfSX9fMloIy40Yj5usNFg9Sx7XzDs4QPGF8SIk",
    category: "Decor",
  },
  {
    id: "3",
    name: "Sonic Pro Wireless",
    price: "$89.99",
    rating: 4.6,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKbiP0r5vftewADQ8L1IPqzXE47sWuCQDxGgO-4g6BimV6imlxw9SL0qzbelFh-gWWDhQ9yWLkUdaSTSD4XDFnffVVj3t-s5ipN5uayskG9IjBfGo0jjX0FKuwqwq2d0aZd4kK0NDll7AMqg23k7_A0BHp82cC2XAWCq0-kysJxBTs_TQkyUyxdeh87Ju7mg2s3i9BD40eoTPcqJJjcawQL_LkCdd501UMtd0vcL47KoQXbi8cuM4Desbx4qdWEBcwJPTnRwVKJ98",
    category: "Electronics",
  },
  {
    id: "4",
    name: "Artisan Leather Journal",
    price: "$30.00",
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRvo4c_44XuKw6H3P7JxEg03YLr5sF9ZtGk4PX8Az9KpPzVG8H1rnDHm_9V6H_ChUp_R4PI-MLX9IJhg75ZbjXYD8RDcCHvDo22Ut_mZk_AwewaE3FN6DJXZx_wmFKVNvxT9SJBeJYNojewEnSo8xM-4sRQ-WbqftM0R01ioRROg7HMqoezRNRC6L_pgOO1Wo8nQpu-2TMDL8lBstap2v-gwFo-nE22Jat2u3bAdyfK18EmswhiRnwewBJu4LFQrOcvOMl14E4TvE",
    category: "Stationery",
  },
  {
    id: "5",
    name: "Abstract Thinker Sculpture",
    price: "$45.00",
    rating: 4.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFUYmbkIbAeS6dFaxTwiPip8S0yJkGa8-4m7TOzC1NRBlvbao_89D5q-tinifUqj3m5K04m0hYpdQBl5yxmyZzRTaraFTDEu3mjK0siEi-uxQ_G7q-D84xYxroLHmh4JsI5MvR4kj2BfS3dw4CI-o7OtJIoD6AIuXIbr0rJi2_o6kzTBFNTlmvE1MUrfBjtu5ms-nJVNJpmU_Irs2LrJf2EVEtwXBUBce2ExFVYI1WKGZseu-tt9Y6-r3JPOxU6TSTb-37Fce9f6w",
    category: "Decorative Statues",
  },
  {
    id: "6",
    name: "Geo Sphere Accent",
    price: "$32.00",
    rating: 5.0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9CJGxC0Fw-zztvkUiTXKf6IVad4JsjbEQgwVzs_VAuEfnky2tWC5iiIr7TY47OgBPS3Kg4YjFnN7SYjO-L8qqYyMzALzQzsXZmWEEaBGX0M9t1myO7Dz_WAgbd4Cl-rtWgRxIRucEuOAkWVdNzigTF0q1RBLvc-VGqvq2KONlr2h_6lgtkhszT8neG2lWmERoY33A1Uffd58RxVAiV7MuKIy2-ixur2NCCLsEijmS9HLC1Mb9uNX76DxQAEAph3rAzqwnzxwdyus",
    category: "Decorative Statues",
  },
  {
    id: "7",
    name: "Nordic Wood Bird",
    price: "$28.50",
    rating: 4.5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIDrNftZj6m4zBqLjuaM35sYRxlGple6_ASU8IYinF1PogNN9qp27vrsOuUH51dv__EFcAzXs4_jKCHfNZaAjW-J70mvJCvpvZWwfghu0w-haw5CBGPwachoZHMUaejpMdtc2XyyHw_0ja4_2fmEODEkEkk40jBiGC6B-hJ8iy1zd99T2U4v3hCL3Q63ob2BT9fRaUKjvf5CvKgniSNZtA2Ej-TmZ40XCBXz--olGMOm5-D9DwP4WkxRqol-dsRfiHhTfnUD6kLQ4",
    category: "Decorative Statues",
  },
];

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (category?: string) => {
    try {
      // Try API first, fallback to mock data
      return await productsApi.getProducts(category as any);
    } catch {
      // Return filtered mock data if API fails
      return category 
        ? mockProducts.filter(p => p.category === category)
        : mockProducts;
    }
  }
);

// Async thunk for fetching single product
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string, { getState }) => {
    try {
      return await productsApi.getProductById(id);
    } catch {
      // Fallback to finding in existing items
      const state = getState() as RootState;
      const product = state.products.items.find(p => p.id === id);
      if (!product) {
        // Try mock data
        const mockProduct = mockProducts.find(p => p.id === id);
        if (mockProduct) return mockProduct;
        throw new Error('Product not found');
      }
      return product;
    }
  }
);

const initialState: ProductsState = {
  items: mockProducts,
  status: "idle",
  error: null,
  inFlights: {
    [ProductsInFlightNames.fetchProductsInFlight]: { status: InFlightStatuses.INITIAL },
    [ProductsInFlightNames.fetchProductByIdInFlight]: { status: InFlightStatuses.INITIAL },
  },
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.inFlights[ProductsInFlightNames.fetchProductsInFlight].status = InFlightStatuses.PENDING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
        state.inFlights[ProductsInFlightNames.fetchProductsInFlight].status = InFlightStatuses.SUCCESS;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
        state.inFlights[ProductsInFlightNames.fetchProductsInFlight].status = InFlightStatuses.ERROR;
      })
      // Fetch Product By ID
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.inFlights[ProductsInFlightNames.fetchProductByIdInFlight].status = InFlightStatuses.PENDING;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update or add product to items
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index >= 0) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
        state.error = null;
        state.inFlights[ProductsInFlightNames.fetchProductByIdInFlight].status = InFlightStatuses.SUCCESS;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product';
        state.inFlights[ProductsInFlightNames.fetchProductByIdInFlight].status = InFlightStatuses.ERROR;
      });
  },
});

// Selectors
export const selectAllProducts = (state: RootState) => state.products.items;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectProductById = (state: RootState, productId: string) =>
  state.products.items.find(product => product.id === productId);

// InFlight Selectors
export const selectIsFetchingProducts = (state: RootState) =>
  state.products.inFlights[ProductsInFlightNames.fetchProductsInFlight].status === InFlightStatuses.PENDING;

export const selectIsFetchingProductById = (state: RootState) =>
  state.products.inFlights[ProductsInFlightNames.fetchProductByIdInFlight].status === InFlightStatuses.PENDING;

export const selectProductsInFlightStatus = (state: RootState, inFlightName: ProductsInFlightNames) =>
  state.products.inFlights[inFlightName].status;

export default productsSlice.reducer;
