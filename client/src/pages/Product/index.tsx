import { useState, useEffect, useMemo } from "react"
import { fetchRecipe, fetchProduct } from "@/utils/recipes"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "@/features/cartSlice"
import { RootState } from "@/app/store"
import { CartItem, Product } from "@/models/Meal"
import Button from "@/components/Button"

const getValidIngredients = (meal: Record<string, any> | undefined): string[] => {
    const ingredients: string[] = []

    for (let key in meal) {
        if (key.startsWith("strIngredient") && meal[key] && meal[key].trim() !== "") {
            ingredients.push(meal[key])
        }
    }

    return ingredients;
};

const RecipePage = () => {
    const [recipe, setRecipe] = useState<Record<string, any>>()
    const [product, setProduct] = useState<Product>()
    const { id } = useParams<{ id: string }>();
    const params: string[] | undefined = id?.split("+")
    const productName: string = params ? params[0] : ""
    const productId: string = params ? params[1] : ""
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items)

    const getRecipe = async (id: string | undefined): Promise<void> => {
        const response = await fetchRecipe(id);
        setRecipe(response);
    }

    const getProduct = async (name: string): Promise<void> => {
        const response = await fetchProduct(name);
        setProduct(response);
    }

    useEffect(() => {
        getRecipe(productName);
        getProduct(productId);
    }, [])

    const {
        idMeal,
        strMealThumb,
        strMeal,
        strCategory,
    } = useMemo(() => recipe ? recipe : {
        strMealThumb: "",
        strMeal: "",
        price: 0.00,
        fastDelivery: false,
        ratings: 0,
        strCategory: ""
    }, [recipe])

    const {
        price,
        fastDelivery,
        ratings,
        inStock
    } = useMemo(() => product ? product : {
        price: 0.00,
        fastDelivery: false,
        ratings: 0,
        inStock: false
    }, [product])
    const ingredients = getValidIngredients(recipe);

    const meal: Product = {
        idMeal: idMeal,
        strMeal: strMeal,
        price: price,
        strMealThumb: strMealThumb,
        ratings: ratings,
        inStock: inStock,
        fastDelivery: fastDelivery,
        strCategory: strCategory
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col md:flex-row w-full md:max-w-2xl lg:max-w-5xl xl:max-w-6xl mx-auto rounded-lg overflow-hidden shadow-lg">
                <img className="w-full md:w-1/2 h-96 object-cover" loading="lazy" src={strMealThumb} alt={strMeal} />
                <div className="p-8 flex flex-col justify-between w-full">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">{strMeal}</h2>
                        <p className="text-xl text-orange-500 mb-4">${price.toFixed(2)}</p>
                        <p className="text-xl text-orange-500 mb-4">Ingredients</p>
                        <p className="text-lg mb-1">{ingredients.join(', ')}</p>
                    </div>
                    <div>
                        <span
                            className={`inline-block px-3 py-2 text-lg font-semibold rounded ${
                                fastDelivery ? 'bg-green-500' : 'bg-red-500'
                            }`}
                        >
                            {fastDelivery ? 'Fast Delivery' : 'Regular Delivery'}
                        </span>
                        <div className="mt-4 text-yellow-500 text-lg">
                            Ratings: {ratings} / 5
                        </div>
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold">Category: {strCategory}</h3>
                        </div>
                        <div className="flex flex-row justify-center items-center mt-4">
                            {cartItems.some((cartItem: CartItem) => cartItem.meal.idMeal === idMeal) ? (
                                <Button
                                    buttonType="button"
                                    action={() => {
                                        dispatch(removeFromCart(meal));
                                    }}
                                    name={<p>Remove from cart</p>}
                                    rounded={true}
                                />
                            ) : (
                                <Button
                                    buttonType="button"
                                    action={() => {
                                        dispatch(addToCart(meal));
                                    }}
                                    name={!inStock ? <p>Out of Stock</p> : <p>Add to Cart</p>}
                                    rounded={true}
                                    disabled={!inStock}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipePage;
