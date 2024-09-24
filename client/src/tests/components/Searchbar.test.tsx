import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import recipeReducer from "@/features/recipeSlice"
import { MemoryRouter } from "react-router-dom"
import { Searchbar } from "@/components"


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

const defaultStore = configureStore({
    reducer: {
        recipe: recipeReducer,
    },
    preloadedState: {
        recipe: initialState,
    }
})

describe("Searchbar Component", () => {

    it("renders the Searchbar component in collapsed view", () => {
        render(
            <Provider store={defaultStore}>
                <MemoryRouter>
                    <Searchbar />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByTestId("search-icon")).toBeInTheDocument()
    })

    it("renders the Searchbar component and gets expanded when icon is clicked", () => {
        render(
            <Provider store={defaultStore}>
                <MemoryRouter>
                    <Searchbar />
                </MemoryRouter>
            </Provider>
        );
        const button = screen.getByTestId("search-icon")
        fireEvent.click(button)
        expect(screen.getByTestId("search-input")).toBeInTheDocument()
        expect(screen.getByTestId("search-button")).toBeInTheDocument()
    })

    it("expands search button input field, then searches for a particular recipe", () => {
        render(
            <Provider store={defaultStore}>
                <MemoryRouter>
                    <Searchbar />
                </MemoryRouter>
            </Provider>
        );
        const button = screen.getByTestId("search-icon")
        fireEvent.click(button)
        fireEvent.change(screen.getByTestId("search-input"), {
            target: { value: "salmon" },
        });
        fireEvent.click(screen.getByTestId("search-button"))
        const state = defaultStore.getState();
        expect(state.recipe.filters.searchQuery).toBe("salmon");
    })

})
