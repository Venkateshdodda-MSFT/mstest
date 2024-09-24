import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchProducts } from "@/utils/recipes"
import { Product } from "@/models/Meal"

const initialState: RecipeState = {
    items: [],
    initialItems: [],
    filters: {
        sortByPrice: "", // 'lowToHigh' or 'highToLow'
        includeOutOfStock: false,
        fastDeliveryOnly: false,
        minRating: 0,
        searchQuery: "",
    }
}

export const fetchProductsAsync = async () => {
    const allProducts = await fetchProducts()
    return allProducts.filter((product: Product) => product !== undefined)
}

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        buildRecipeList: (state, action: PayloadAction<Product[]>) => {
            state.items = action.payload;
            if (state.initialItems?.length === 0) {
                state.initialItems = action.payload
            }
        },
        setKeyword: (state, action: PayloadAction<string>) => {
            state.filters.searchQuery = action.payload
        },
        sortPrice: (state, action: PayloadAction<string>) => {
            state.filters.sortByPrice = action.payload
        },
        sortStock: (state) => {
            state.filters.includeOutOfStock = !state.filters.includeOutOfStock
        },
        sortFastDelivery: (state) => {
            state.filters.fastDeliveryOnly = !state.filters.fastDeliveryOnly
        },
        sortRating: (state, action: PayloadAction<number>) => {
            state.filters.minRating = action.payload
        },
        sortQuery: (state, action: PayloadAction<string>) => {
            state.filters.searchQuery = action.payload
        },
        clearFilters: (state) => {
            state.filters = {
                sortByPrice: "",
                includeOutOfStock: false,
                fastDeliveryOnly: false,
                minRating: 0,
                searchQuery: "",
            }
            state.items = initialState.items
        }
    }
})

export default recipeSlice.reducer
export const {
    buildRecipeList,
    setKeyword,
    sortPrice,
    sortStock,
    sortFastDelivery,
    sortRating,
    sortQuery,
    clearFilters
} = recipeSlice.actions