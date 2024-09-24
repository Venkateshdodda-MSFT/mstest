import { login, register } from "@/utils/customerService"
import { fetchRecipe, fetchProduct, fetchProducts } from '@/utils/recipes'
import { createOrder } from "@/utils/orders"
import { getStripeKey } from "@/utils/stripe"
import { Meal } from '@/models/Meal'
import { cartItems } from "../mocks/order"


describe("Utility methods", () => {
    it("Successfully logins cutomer by passing the correct credentials", async () => {
        const customer: void | Customer = await login("stevie.five", "soFetch012490!")
        expect(customer).toHaveProperty("customerId")
    })
    it("Unsuccessful login when incorrect credentials are provided", async () => {
        const customer: void | Customer = await login("stevie.five", "[wrong_password]")
        expect(customer).toBeUndefined()
    })
    it("Successfully registers a new customer", async () => {
        const int: number = (Math.random() * (30000 - 1) + 1)
        const customerDetails: CustomerDetails = {
            firstName: "Juan",
            lastName: "Snow+"+ int,
            email: "juan.snow+"+ int,
            phone: "5555555555",
            address: "Glen Fifer Avenue, San Tropez, CA 94306",
            username: "juan.snow+" + int, 
            passwordHash: "myCrazyPassword!"
        }
        const customer: void | Customer = await register(customerDetails)
        expect(customer).toHaveProperty("customerId")
    })
    it("Unsuccessfully registers a new customer with missing data", async () => {
        const int: number = (Math.random() * (30000 - 1) + 1)
        const customerDetails: any = {
            firstName: "Juan",
            lastName: "Snow+"+ int,
            email: "juan.snow+"+ int,
            phone: "5555555555",
            address: "Glen Fifer Avenue, San Tropez, CA 94306",
            passwordHash: "myCrazyPassword!"
        }
        const customer: void | Customer = await register(customerDetails)
        expect(customer).toBeUndefined()
    })
    it("Successfully fetches recipe", async () => {
        const recipe: Meal = await fetchRecipe("Seafood fideuà")
        expect(recipe).toHaveProperty("idMeal")
    })
    it("Successfully fetches product", async () => {
        const product: Product = await fetchProduct("31")
        expect(product).toHaveProperty("strMealThumb")
    })
    it("Unsuccesfully fetches product", async () => {
        const product: Product = await fetchProduct("8008")
        expect(product).toBe("")
    })
    it("Successfully fetches products", async () => {
        const products: Product[] = await fetchProducts()
        expect(products.length).toBeGreaterThan(0)
        expect(products[0]).toHaveProperty("strMealThumb")
    })
    it("Successfully creates a new order", async () => {
        const order: Order | void = await createOrder("1", 22.00, cartItems)
        expect(order).toHaveProperty("orderID")
        expect(order).toHaveProperty("customerID")
    })
    it("Successfully retrieves Stripe Key and Secret", async () => {
        const keys: StripeKey | void = await getStripeKey("stripe_key")
        expect(keys).toHaveProperty("publishableKey")
        expect(keys).toHaveProperty("secretKey")
    })
})
