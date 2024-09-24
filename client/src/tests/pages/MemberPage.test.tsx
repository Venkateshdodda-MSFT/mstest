import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { configureStore } from "@reduxjs/toolkit"
import customerReducer from "@/features/customerSlice"
import { MemberPage } from '@/pages'

describe("MemberPage page component", () => {

    it("when customer exists, render the profile information", () => {

        const mockState: CustomerState = {
            customer: {
                customerId: '12345',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '123-456-7890',
                address: '123 Main St',
                username: 'johndoe',
            }
        }

        const store = configureStore({
            reducer: {
                customer: customerReducer
            },
            preloadedState: {
                customer: mockState
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MemberPage />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByTestId("profile-pic")).toBeInTheDocument()
        expect(screen.getByText("johndoe")).toBeInTheDocument()
        expect(screen.getByText("John Doe")).toBeInTheDocument()
        expect(screen.getByText("john.doe@example.com")).toBeInTheDocument()
        expect(screen.getByText("123-456-7890")).toBeInTheDocument()
        expect(screen.getByText("123 Main St")).toBeInTheDocument()
    })

    it("when customer doesnt exist, show the Login component", () => {

        const initialState: CustomerState = {
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

        const store = configureStore({
            reducer: {
                customer: customerReducer
            },
            preloadedState: {
                customer: initialState
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MemberPage />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText("Not a member?")).toBeInTheDocument()

        expect(screen.getByPlaceholderText("Username")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
    })

    it("when customer doesnt exist, show the Login component", () => {

        const initialState: CustomerState = {
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

        const store = configureStore({
            reducer: {
                customer: customerReducer
            },
            preloadedState: {
                customer: initialState
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MemberPage />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByPlaceholderText("Username")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
        expect(screen.queryAllByText("Back to Login").length).toBe(0)

    })

    it("when user clicks 'Not a Member?' the Register component appears", async () => {

        const initialState: CustomerState = {
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

        const store = configureStore({
            reducer: {
                customer: customerReducer
            },
            preloadedState: {
                customer: initialState
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MemberPage />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByTestId("register-login-button"))

        await waitFor(() => {
            expect(screen.getByText("Back to Login")).toBeInTheDocument()
            expect(screen.getByPlaceholderText("Address")).toBeInTheDocument()
            expect(screen.getByPlaceholderText("Phone")).toBeInTheDocument()
            expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument()
            expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument()
            expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
        })

        expect(screen.queryAllByText("Not a member?").length).toBe(0)

    })

    it("when user clicks 'Not a Member?' the Register component appears, then switch back to LoginForm compononet by clicking 'Back to Login'", async () => {

        const initialState: CustomerState = {
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

        const store = configureStore({
            reducer: {
                customer: customerReducer
            },
            preloadedState: {
                customer: initialState
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MemberPage />
                </MemoryRouter>
            </Provider>
        );

        const toggleButton = screen.getByTestId("register-login-button")
        fireEvent.click(toggleButton)

        await waitFor(() => {
            expect(screen.getByText("Back to Login")).toBeInTheDocument()
        })

        fireEvent.click(toggleButton)

        await waitFor(() => {
            expect(screen.getByText("Not a member?")).toBeInTheDocument()
            expect(screen.getByPlaceholderText("Username")).toBeInTheDocument()
            expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
        })

    })

})