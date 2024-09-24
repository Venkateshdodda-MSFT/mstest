import { render, screen } from "@testing-library/react";
import cartReducer from "@/features/cartSlice"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { configureStore } from "@reduxjs/toolkit"
import ProtectedRoute from "@/components/ProtectedRoute";


const buildStore = (state: CartState) => (
    configureStore({
        reducer: {
            cart: cartReducer
        },
        preloadedState: {
            cart: state
        },
    })
)

describe("ProtectedRoute", () => {

  test("displays fallback message when orderCreated is false", () => {

    const store = buildStore({items: [], orderCreated: false})
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProtectedRoute />
            </MemoryRouter>
        </Provider>
    )

    // Assert that the fallback message is displayed
    expect(screen.getByText("Whoops! Looks like you got here by accident.")).toBeInTheDocument();
  });

  test("renders ThankYou component when orderCreated is true", () => {

    const store = buildStore({items: [], orderCreated: true})
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProtectedRoute />
            </MemoryRouter>
        </Provider>
    )

    // Assert that the ThankYou component is displayed
    expect(screen.getByText("Thank you for your order!")).toBeInTheDocument();
  });
});
