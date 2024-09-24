import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { MemoryRouter } from "react-router-dom"
import cartReducer from "@/features/cartSlice"
import { SingleMeal } from "@/components"

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

const defaultStore = configureStore({
    reducer: {
        cart: cartReducer
    },
    preloadedState: {
        cart: initialState
    },
})

describe("SingleMeal Component", () => {
    it("renders the SingleMeal component and all the recipe attributes", () => {

        render(
            <Provider store={defaultStore}>
                <MemoryRouter>
                    <SingleMeal meal={mockItem} />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByRole("link")).toHaveAttribute("href", "/product/Seafood fideuà+31")
        expect(screen.getByRole("img")).toHaveAttribute("src", "https://www.themealdb.com/images/media/meals/wqqvyq1511179730.jpg")
        expect(screen.getByText("Seafood fideuà")).toBeInTheDocument()
        expect(screen.getByTestId("price")).toBeInTheDocument()
        expect(screen.getByText("4 days delivery")).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument()
    })

    it("add meal item to cart by clicking add to cart button, show remove from cart button, then remove from cart with new button", () => {

        render(
            <Provider store={defaultStore}>
                <MemoryRouter>
                    <SingleMeal meal={mockItem} />
                </MemoryRouter>
            </Provider>
        )

        //add mock item to cart
        const addToCartButton: HTMLButtonElement = screen.getByRole("button", { name: /add to cart/i })
        fireEvent.click(addToCartButton)
        const state = defaultStore.getState();
        expect(state.cart.items[0].meal).toBe(mockItem)

        //check if remove from cart button is shown
        const removeFromCartButton: HTMLButtonElement = screen.getByRole("button", { name: /remove from cart/i})
        expect(removeFromCartButton).toBeInTheDocument()

        //remove mock item from current cart
        fireEvent.click(removeFromCartButton)
        const newState = defaultStore.getState()
        expect(newState.cart.items.length).toBe(0)
    })
})
