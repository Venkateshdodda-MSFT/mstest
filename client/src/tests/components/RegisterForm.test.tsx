import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "@/features/customerSlice"
import { RegisterForm } from "@/components";

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

const defaultStore = configureStore({
    reducer: {
        customer: customerReducer
    },
    preloadedState: {
        customer: initialState
    },
})

vi.mock('@/utils/customerService', () => ({
    register: vi.fn().mockResolvedValueOnce({
        customerId: '12345',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: '123 Main St',
        username: 'johndoe',
    })
}))

beforeEach(() => {
    vi.clearAllMocks();
});

describe("RegisterForm Component", () => {

    it("renders the register form", () => {

        render(
            <Provider store={defaultStore}>
              <BrowserRouter>
                <RegisterForm />
              </BrowserRouter>
            </Provider>
          );
      

        expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Phone")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Address")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Register/i })).toBeInTheDocument();
    })


    it("shows validation errors if fields are empty on submit", async () => {

        render(
            <Provider store={defaultStore}>
              <BrowserRouter>
                <RegisterForm />
              </BrowserRouter>
            </Provider>
          );
      
        fireEvent.click(screen.getByRole("button", { name: /Register/i }));

        await waitFor(() => {
            expect(screen.getByText(/username is a required field/i)).toBeInTheDocument();
            expect(screen.getByText(/password is a required field/i)).toBeInTheDocument();
            expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
            expect(screen.getByText(/email is a required field/i)).toBeInTheDocument();
            expect(screen.getByText(/address is required/i)).toBeInTheDocument();

        });
    });


    it("registers a new customer and shows a loading spinner during form submission", async () => {

        render(
            <Provider store={defaultStore}>
              <BrowserRouter>
                <RegisterForm />
              </BrowserRouter>
            </Provider>
          );
      
        fireEvent.change(screen.getByPlaceholderText("Username"), {
            target: { value: "jarjar.binks" },
        });
        fireEvent.change(screen.getByPlaceholderText("First Name"), {
            target: { value: "Jar Jar" },
        });
        fireEvent.change(screen.getByPlaceholderText("Last Name"), {
            target: { value: "Binks" },
        });
        fireEvent.change(screen.getByPlaceholderText("Phone"), {
            target: { value: "5555555555" },
        });
        fireEvent.change(screen.getByPlaceholderText("Address"), {
            target: { value: "Otoh Gunga City, Lake Paonga, Naboo, Galactic Republic" },
        });
        fireEvent.change(screen.getByPlaceholderText("Email"), {
            target: { value: "jarjarb@gmail.com" },
        });
        const button = screen.getByRole("button", { name: /Register/i })
        fireEvent.click(button);

        //wait for spinner to appear
        await waitFor(() => {
            expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
        });

    });
});
