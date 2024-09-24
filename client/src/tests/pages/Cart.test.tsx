import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit"
import cartReducer, { cartSlice, addToCart } from "@/features/cartSlice"
import { Cart } from "@/pages";

const initialState: CartState = {
    items: [],
    orderCreated: false
}

const mockItem: Product = {
            idMeal: "31",
            price: 33.99,
            strMeal: "Seafood fideuà",
            strMealThumb: "https://www.themealdb.com/images/media/meals/wqqvyq1511179730.jpg",
            ratings: 3,
            inStock: true,
            fastDelivery: false,
            strCategory: "Spanish"
}


describe("Cart page component", () => {
    it("renders the cart page with an empty cart", () => {

        const state: CartState = initialState
        const store = configureStore({
            reducer: {
                cart: cartReducer
            },
            preloadedState: {
                cart: state
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText("Your cart is empty!")).toBeInTheDocument()
        expect(screen.getByText("Subtotal (0) items")).toBeInTheDocument()
        expect(screen.getByText("Total: $0.00")).toBeInTheDocument()
    })
    it("renders the cart page with an item in the cart", async() => {

        const state: CartState = initialState
        const result = cartSlice.reducer(state, addToCart(mockItem))

        const store = configureStore({
            reducer: {
                cart: cartReducer
            },
            preloadedState: {
                cart: result
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText("Seafood fideuà")).toBeInTheDocument()
        expect(screen.getByText(/Total: \$\s*33\.99/)).toBeInTheDocument()
        expect(screen.getByText("Subtotal (1) items")).toBeInTheDocument()
    })
})