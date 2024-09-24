import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { Account } from "@/components"
import { customerSlice, login, logout } from "@/features/customerSlice"
import customerReducer from "@/features/customerSlice"
import { configureStore } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
import { Customer } from "@/models/Customer"

vi.mock("js-cookie")

describe("Account component", () => {
  const initialState: CustomerState = {
    customer: {
      customerId: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      username: ""
    },
  }

  const mockCustomer: Customer = {
    customerId: "12345",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St",
    username: "johndoe",
  }


  it("should log in the customer and set the cookie, and renders Sign Out when customer is not defined", () => {
    const state: CustomerState = { customer: mockCustomer }

    const result = customerSlice.reducer(state, login(mockCustomer))

    expect(result.customer).toEqual(mockCustomer)
    expect(Cookies.set).toHaveBeenCalledWith(
      "customer",
      JSON.stringify(result),
      { expires: 7 }
    )

    const store = configureStore({
        reducer: { 
            customer: customerReducer 
        },
        preloadedState: {
            customer: state
        },
      })
  
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Account />
          </MemoryRouter>
        </Provider>
      )
  
      expect(screen.getByText(/Sign Out/i)).toBeDefined()
  })



  it("should log out the customer and clear the cookie", () => {
    const loggedInState = { customer: mockCustomer }

    const result = customerSlice.reducer(loggedInState, logout())

    expect(result.customer).toEqual(initialState.customer)
    expect(Cookies.set).toHaveBeenCalledWith(
      "customer",
      JSON.stringify(result),
      { expires: 7 }
    )
  })
})