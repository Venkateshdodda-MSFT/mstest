declare module "circletype"
interface mealProps {
        byStock: boolean,
        byFastDelivery: boolean,
        byRating: number,
        searchQuery: string,
}
declare interface Object {[key: string]: any}
declare interface CheckoutFormValues {
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
}
declare interface StateOption { 
    label: string,
    value: string 
}
declare interface Styles {[key:string]: string}
declare interface Customer {
    customerId: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    username: string
}
declare interface Order {
    customerId: number,
    orderDate: Date,
    totalAmount: number,
    status: string
}
declare interface CartState {
    items: cartItems,
    orderCreated: boolean
}
declare type cartItems = { meal: Meal, quantity: number }[]
declare interface MealResponse {
    idMeal: string;
    strMeal: string;
    strDrinkAlternate: string | null;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string;
    strYoutube: string;
    strIngredient1: string;
    strIngredient2: string;
    strIngredient3: string;
    strIngredient4: string;
    strIngredient5: string;
    strIngredient6: string;
    strIngredient7: string;
    strIngredient8: string;
    strIngredient9: string;
    strIngredient10: string | null;
    strMeasure1: string;
    strMeasure2: string;
    strMeasure3: string;
    strMeasure4: string;
    strMeasure5: string;
    strMeasure6: string;
    strMeasure7: string;
    strMeasure8: string;
    strMeasure9: string;
    strMeasure10: string | null;
    strSource: string | null;
    strImageSource: string | null;
    strCreativeCommonsConfirmed: string | null;
    dateModified: string | null;
}
declare interface RecipeState {
    items: Product[] | null,
    initialItems: Product[] | null,
    filters: {
        sortByPrice: string
        includeOutOfStock: boolean,
        fastDeliveryOnly: boolean,
        minRating: number,
        searchQuery: string,
    }
}
declare interface CustomerState {
    customer: Customer
}
declare interface FilterList { value: string, type: string, order: string, action: Function, checked: boolean }
declare interface Filters { 
    sortByPrice: string
    includeOutOfStock: boolean
    fastDeliveryOnly: boolean
    minRating: number
    searchQuery: string
}
declare interface StripeKey { keyId: number, keyName: string, publishableKey: string, secretKey: string }
declare interface Meal {
    idMeal: string,
    strMeal: string,
    price: number,
    strMealThumb: string,
    ratings: number
    inStock: boolean,
    fastDelivery: boolean
    strCategory: string
}
declare interface Product {
    idMeal: string,
    strMealThumb: string,
    strMeal: string,
    price: number,
    fastDelivery: boolean,
    ratings: number,
    inStock: boolean,
    strCategory: string
}
declare interface CustomerDetails {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    username: string, 
    passwordHash: string
}