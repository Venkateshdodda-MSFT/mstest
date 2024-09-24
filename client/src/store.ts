import { configureStore } from "@reduxjs/toolkit"
import recipeReducer from "@/features/recipeSlice"
import cartReducer from "@/features/cartSlice"
import customerReducer from "@/features/customerSlice"

export const store = configureStore({
    reducer: {
        recipe: recipeReducer,
        cart: cartReducer,
        customer: customerReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>