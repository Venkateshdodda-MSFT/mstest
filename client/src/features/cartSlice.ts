import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Cookies from "js-cookie"

const getCartItems = (): cartItems => {
    const cartCookie: string | undefined = Cookies.get("shoppingCart")
    return cartCookie?.length ? JSON.parse(cartCookie).items : []
}

const setCartCookie = (cart: CartState) => {
    const cartString = JSON.stringify(cart)
    Cookies.set("shoppingCart", cartString, { expires: 7 })
}

const initialState: CartState = {
    items: getCartItems(),
    orderCreated: false
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingIndex = state.items.findIndex((item) => item.meal.idMeal === action.payload.idMeal)
            if(existingIndex >= 0){
                state.items[existingIndex].quantity += 1
            } else {
                state.items.push({ meal: action.payload, quantity: 1 })
            }
            setCartCookie(state)
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {
            state.items = state.items.filter((item) =>  item.meal.idMeal !== action.payload.idMeal)
            setCartCookie(state)
        },
        updateQuantity: (state, action: PayloadAction<{ idMeal: string, quantity: number }>) => {
            const index = state.items.findIndex((item) => item.meal.idMeal === action.payload.idMeal)
            if(index >= 0){
                state.items[index].quantity = action.payload.quantity
            }
            setCartCookie(state)
        },
        clearCart: (state) => {
            state.items = []
            setCartCookie(state)
        },
        updateOrderCreated: (state, action: PayloadAction<boolean>) => {
            state.orderCreated = action.payload
            setCartCookie(state)
        }
    }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, updateOrderCreated } = cartSlice.actions

export default cartSlice.reducer