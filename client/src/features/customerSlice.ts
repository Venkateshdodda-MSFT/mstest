import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
import { Customer } from "@/models/Customer"


const getCustomerFromCookie = (): Customer => {
    const customerCookie: string | undefined = Cookies.get("customer")
    return customerCookie?.length ? JSON.parse(customerCookie).customer : {}
}

const setCustomerCookie = (customer: CustomerState) => {
    const customerString = JSON.stringify(customer)
    Cookies.set("customer", customerString, { expires: 7 })
}

const initialState: CustomerState = {
    customer: getCustomerFromCookie()
}

export const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<Customer>) => {
            state.customer = action.payload
            setCustomerCookie(state)
        },
        logout: (state) => {
            state.customer = {
                customerId: "",
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                address: "",
                username: ""
            }
            setCustomerCookie(state)
        }
    }
})

export const { login, logout } = customerSlice.actions

export default customerSlice.reducer