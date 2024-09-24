export interface Meal {
    idMeal: string,
    name: string,
    price: number,
    strMeal: string,
    strMealThumb: string,
    ratings: number
    inStock: boolean,
    fastDelivery: boolean
}
export interface Product {
    idMeal: string,
    strMealThumb: string,
    strMeal: string,
    price: number,
    fastDelivery: boolean,
    ratings: number,
    inStock: boolean,
    strCategory: string
}
export interface CartItem {
    meal: Product,
    quantity: number
}

export interface CartState {
    items: CartItem[],
    total: number
}