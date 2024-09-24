import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { configureStore } from "@reduxjs/toolkit"
import recipeReducer from "@/features/recipeSlice"
import cartReducer from "@/features/cartSlice"
import { meals } from "../mocks/meals"
import { Meals } from '@/pages';

const initialState: RecipeState = {
    items: meals,
    initialItems: [],
    filters: {
        sortByPrice: "", // 'lowToHigh' or 'highToLow'
        includeOutOfStock: false,
        fastDeliveryOnly: false,
        minRating: 0,
        searchQuery: "",
    }
}

const initialCart: CartState = {
    items: [],
    orderCreated: false
}


describe("Meals page component", () => {
    it("renders the Meal page with products and filters", () => {

        const state: RecipeState = initialState
        const store = configureStore({
            reducer: {
                recipe: recipeReducer,
                cart: cartReducer
            },
            preloadedState: {
                recipe: state,
                cart: initialCart
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Meals />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText("Chicken Karaage")).toBeInTheDocument()
        expect(screen.getByText("Honey Teriyaki Salmon")).toBeInTheDocument()
        expect(screen.getAllByRole("img").length).toBe(6)
    })
    it("filters the product product list by using the filters", async() => {

        const state: RecipeState = initialState
        const store = configureStore({
            reducer: {
                recipe: recipeReducer,
                cart: cartReducer
            },
            preloadedState: {
                recipe: state,
                cart: initialCart
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Meals />
                </MemoryRouter>
            </Provider>
        )

        const fastDeliveryOnly: HTMLInputElement = screen.getByDisplayValue("Fast Delivery Only")
        fireEvent.click(fastDeliveryOnly)
        await waitFor(() => {
            expect(screen.getByText("Chicken Karaage")).toBeInTheDocument()
            expect(screen.queryByText("Honey Teriyaki Salmon")).not.toBeInTheDocument()
        })

    })
    it("Go to second page of product list", async() => {

        const state: RecipeState = initialState
        const store = configureStore({
            reducer: {
                recipe: recipeReducer,
                cart: cartReducer
            },
            preloadedState: {
                recipe: state,
                cart: initialCart
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Meals />
                </MemoryRouter>
            </Provider>
        )


        expect(screen.queryAllByText("Japanese gohan rice").length).toBe(0)
        fireEvent.click(screen.getByTestId("next"))
        await waitFor(() => {
            expect(screen.getByText("Japanese gohan rice")).toBeInTheDocument()
            expect(screen.queryAllByText("Japanese gohan rice").length).toBe(1)
        })

    })
})