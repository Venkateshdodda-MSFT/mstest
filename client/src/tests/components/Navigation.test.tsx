import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import cartReducer from "@/features/cartSlice"
import customerReducer from "@/features/customerSlice"
import { Navigation } from "@/components";

const defaultCart: CartState = {
    items: [],
    orderCreated: false
}


const defaultCustomer: CustomerState = {
    customer: {
        customerId: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        username: ""
    }
}


// Test Case 1: State Management
describe('Navigation Component', () => {
   
    it('should render all the navigation links and components', () => {
        const store = configureStore({
            reducer: {
                cart: cartReducer,
                customer: customerReducer
            },
            preloadedState: {
                cart: defaultCart,
                customer: defaultCustomer
            }
        })
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Navigation />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByTestId('home-link-desktop')).toHaveAttribute('href', '/')
        expect(screen.getByTestId('products-link-desktop')).toHaveAttribute('href', '/products')
        expect(screen.getByTestId('get-the-app-link-desktop')).toHaveAttribute('href', '/phone-app')
        expect(screen.getByTestId('cart-container')).toBeInTheDocument();
        expect(screen.getByTestId('account-container')).toBeInTheDocument();
        expect(screen.getByTestId('nav-account-link')).toHaveAttribute('href', '/login')

        // Check for components like Searchbar

        const searchIcon = screen.getByTestId('search-icon');
        fireEvent.click(searchIcon);
        expect(screen.getByPlaceholderText("Search for recipes...")).toBeInTheDocument()

    });

    it('should toggle mobile menu visibility when the button is clicked', () => {

        const store = configureStore({
            reducer: {
                cart: cartReducer,
                customer: customerReducer
            },
            preloadedState: {
                cart: defaultCart,
                customer: defaultCustomer
            }
        })
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Navigation />
                </MemoryRouter>
            </Provider>
        );

        window.innerWidth = 500

        fireEvent(window, new Event('resize'))

        const toggleButton = screen.getByTestId('menu-toggle-button')
        const mobileMenu = screen.getByTestId("navbar-hamburger")
        expect(mobileMenu).toHaveClass("hidden")

        // Click to open the menu
        fireEvent.click(toggleButton);
        expect(mobileMenu).toHaveClass("block")

        expect(screen.getByTestId('menu-toggle-button')).toBeInTheDocument()
        expect(screen.getByTestId('navbar-hamburger')).toBeInTheDocument();
        expect(screen.getByTestId('nav-home-link-mobile')).toHaveAttribute('href', '/')
        expect(screen.getByTestId('nav-products-link-mobile')).toHaveAttribute('href', '/products')
        expect(screen.getByTestId('nav-cart-link-mobile')).toHaveAttribute('href', '/cart')
    });
});
