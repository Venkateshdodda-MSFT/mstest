import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import recipeReducer, {
    recipeSlice,
    sortQuery
} from "@/features/recipeSlice"
import { configureStore } from '@reduxjs/toolkit';
import { Filters } from "@/components"

describe("Filters Component", () => {

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
    

    test("renders no filters activated", () => {

        const state: RecipeState = initialState
        const store = configureStore({
            reducer: {
                recipe: recipeReducer
            },
            preloadedState: {
                recipe: state
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Filters resetPage={() => ""}/>
                </MemoryRouter>
            </Provider>
        )

        const ascendingRadio: HTMLInputElement = screen.getByDisplayValue("Ascending")
        const descendingRadio: HTMLInputElement = screen.getByDisplayValue("Descending")
        const includeOutOfStock: HTMLInputElement = screen.getByDisplayValue("Include Out of Stock")
        const fastDeliveryOnly: HTMLInputElement = screen.getByDisplayValue("Fast Delivery Only")


        expect(ascendingRadio.checked).toBe(false)
        expect(descendingRadio.checked).toBe(false)
        expect(includeOutOfStock.checked).toBe(false)
        expect(fastDeliveryOnly.checked).toBe(false)

    })

    test("renders filter by ascending price activated", () => {

        const store = configureStore({
            reducer: {
                recipe: recipeReducer
            },
            preloadedState: {
                recipe: initialState
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Filters resetPage={() => ""}/>
                </MemoryRouter>
            </Provider>
        )

        const ascendingRadio: HTMLInputElement = screen.getByDisplayValue("Ascending")
        fireEvent.click(ascendingRadio)
        expect(store.getState().recipe.filters.sortByPrice).toBe("lowToHigh")
        expect(ascendingRadio.checked).toBe(true)
    })

    test("renders filters by descending price and sort by fast delivery activated", () => {

        const store = configureStore({
            reducer: {
                recipe: recipeReducer
            },
            preloadedState: {
                recipe: initialState
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Filters resetPage={() => ""}/>
                </MemoryRouter>
            </Provider>
        )

        const ascendingRadio: HTMLInputElement = screen.getByDisplayValue("Descending")
        fireEvent.click(ascendingRadio)
        const fastDeliveryOnly: HTMLInputElement = screen.getByDisplayValue("Fast Delivery Only")
        fireEvent.click(fastDeliveryOnly)
        expect(store.getState().recipe.filters.sortByPrice).toBe("highToLow")
        expect(store.getState().recipe.filters.fastDeliveryOnly).toBe(true)
        expect(ascendingRadio.checked).toBe(true)
        expect(fastDeliveryOnly.checked).toBe(true)

    })

    test("renders filters by descending price and out of stock included activated", () => {

        const store = configureStore({
            reducer: {
                recipe: recipeReducer
            },
            preloadedState: {
                recipe: initialState
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Filters resetPage={() => ""}/>
                </MemoryRouter>
            </Provider>
        )


        const descendingRadio: HTMLInputElement = screen.getByDisplayValue("Descending")
        fireEvent.click(descendingRadio)
        const includeOutOfStock: HTMLInputElement = screen.getByDisplayValue("Include Out of Stock")
        fireEvent.click(includeOutOfStock)
        expect(store.getState().recipe.filters.sortByPrice).toBe("highToLow")
        expect(store.getState().recipe.filters.includeOutOfStock).toBe(true)
        expect(descendingRadio.checked).toBe(true)
        expect(includeOutOfStock.checked).toBe(true)
    })

    test("renders all filters toggled on (ascending price)", () => {

        const store = configureStore({
            reducer: {
                recipe: recipeReducer
            },
            preloadedState: {
                recipe: initialState
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Filters resetPage={() => ""}/>
                </MemoryRouter>
            </Provider>
        )


        const descendingRadio: HTMLInputElement = screen.getByDisplayValue("Ascending")
        fireEvent.click(descendingRadio)
        const includeOutOfStock: HTMLInputElement = screen.getByDisplayValue("Include Out of Stock")
        fireEvent.click(includeOutOfStock)
        const includeFastDelivery: HTMLInputElement = screen.getByDisplayValue("Fast Delivery Only")
        fireEvent.click(includeFastDelivery)

        expect(store.getState().recipe.filters.sortByPrice).toBe("lowToHigh")
        expect(store.getState().recipe.filters.includeOutOfStock).toBe(true)
        expect(store.getState().recipe.filters.fastDeliveryOnly).toBe(true)

        expect(descendingRadio.checked).toBe(true)
        expect(includeOutOfStock.checked).toBe(true)
        expect(includeFastDelivery.checked).toBe(true)
    })

    test("renders search query filter", () => {

        let result: RecipeState = recipeSlice.reducer(initialState, sortQuery("salmon"))

        const store = configureStore({
            reducer: {
                recipe: recipeReducer
            },
            preloadedState: {
                recipe: result
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Filters resetPage={() => ""}/>
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText(/salmon/i)).toBeDefined()

    })

    
})