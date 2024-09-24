import { ChangeEvent } from "react"
import { Link } from "react-router-dom"
import { Rating, Button } from "@/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { updateQuantity, removeFromCart } from "@/features/cartSlice"
import { RootState } from "@/app/store"
import { CartItem } from "@/models/Meal"
import { useDispatch, useSelector } from "react-redux"


const Cart = () => {

    const cart = useSelector((state: RootState) => state.cart.items)
    const cartTotal = (Math.round(cart.reduce((acc: number, curr: Object) => 
        acc + (curr.meal.price * curr.quantity), 0.00) * 100) / 100).toFixed(2);
    const dispatch = useDispatch()

    return (
        <div className="flex flex-col lg:flex-row w-full">
            <div className="w-full lg:w-[75%] p-8" >
                <ol className="Tiempos">
                    {
                        cart.length > 0 ? cart.map((prod: CartItem) => (
                            <li key={prod.meal.strMeal} className="flex flex-col justify-around items-center bg-white shadow-lg p-4 my-4 rounded-lg shadow md:flex-row md:width-full hover:bg-gray-100">
                                <Link to={`/product/`+prod.meal.strMeal+`+`+prod.meal}><img className="md:max-w-xs fluid rounded-lg" src={prod.meal.strMealThumb} alt={prod.meal.strMeal} /></Link>
                                <p>{prod.meal.strMeal}</p>
                                <p>${prod.meal.price.toFixed(2)}</p>
                                <Rating rating={prod.meal.ratings} className="px-6 pb-2" />
                                <select 
                                    className="w-28"
                                    value={prod.quantity}
                                    onChange={(e: ChangeEvent<HTMLSelectElement>) => 
                                        dispatch(updateQuantity({idMeal: prod.meal.idMeal, quantity: parseInt(e.target.value)}))}
                                >
                                    {
                                       [...Array(5).keys()].map((x) => (
                                            <option key={x + 1}>{x + 1}</option>
                                       ))
                                    }
                                </select>
                                <div className="block text-[#343a40] hover:text-blue text-sm cursor-pointer">
                                    <FontAwesomeIcon 
                                        icon={faTrashCan} 
                                        onClick={() => dispatch(removeFromCart(prod.meal))}
                                    />
                                </div>
                            </li>
                        )) : <li className="Tiempos text-lg">Your cart is empty!</li>
                    }
                </ol>
            </div>
            <div className="flex flex-col bg-[#343a40] text-white p-6 w-full lg:w-[25%] m-2 h-[86vh]">
                <h1 className="text-xxl mb-3">Subtotal ({cart.length}) items</h1>
                <p className="Manrope bold mb-3">Total: ${cartTotal}</p>
                {
                    cart.length > 0 ? 
                    <Link to="/checkout" className="flex justify-center align-items">
                        <Button buttonType="button" name={<p>Proceed to Checkout</p>} className="bg-blue" rounded={false} />
                    </Link> : ""
                }
            </div>
        </div>
    )
}

export default Cart