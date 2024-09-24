import { useState, useRef, useEffect} from 'react'
import Button from '@/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { removeFromCart } from "@/features/cartSlice"
import { RootState } from "@/app/store"
import { useDispatch, useSelector } from "react-redux"
import { CartItem } from '@/models/Meal'
import { faCartShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false)
    const navigate = useNavigate()
    const dropdownMenu = useRef<HTMLDivElement>(null)
    const cart = useSelector((state: RootState) => state.cart.items)
    const dispatch = useDispatch()

    const closeOpenCart = (event: MouseEvent): void => {
        const target = event.target as HTMLElement
        if(!dropdownMenu?.current?.contains(target)){
            setDropdownVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", closeOpenCart)
        return () => {
            document.removeEventListener("mousedown", closeOpenCart)
        }
    }, [cart])

    return(
        <div className="relative py-2 pl-3 pr-4 text-black-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0">
            <button onClick ={() => setDropdownVisible(!dropdownVisible)} disabled={dropdownVisible} className="text-gray-700 bg-blue-700 hover:bg-blue-800 md:hover:text-blue focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                <FontAwesomeIcon icon={faCartShopping} />
                <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">{cart.length}</span>
            </button>
            <div id="dropdown" ref={dropdownMenu} className={`absolute right-[.2rem] z-10 ${dropdownVisible ? "" : "hidden"} bg-black divide-y divide-gray-100 p-3 rounded-lg shadow min-w-[20rem]`}>
                <ul className="py-2 text-sm bg-gray-700" aria-labelledby="dropdownDefaultButton">
                    {
                        cart.length > 0 ? cart.map((item: CartItem) =>
                            <li key={item.meal.idMeal} className="flex flex-row items-center justify-evenly my-3">
                                <img 
                                    src={item.meal.strMealThumb} 
                                    className="h-8 w-8 rounded-full mx-2" 
                                    alt={item.meal.strMeal} 
                                />
                                <div className="flex flex-col text-white text-sm">
                                    <span>{item.meal.strMeal}</span>
                                    <span>${item.meal.price.toFixed(2)}</span>
                                </div>
                                <div className="block text-white hover:text-blue text-sm cursor-pointer">
                                    <FontAwesomeIcon 
                                        icon={faTrashCan} 
                                        onClick={() => dispatch(removeFromCart(item.meal))}
                                         data-testid="remove-button"
                                    />
                                </div>
                            </li>
                        ) : <li className="block text-white hover:text-blue text-sm cursor-pointer text-lg">Your cart is empty!</li>
                    }<li>
                        
                    </li>
                    <li className="flex flex-row align-items justify-center">
                        <Button 
                            buttonType="button"
                            action={() => {
                                navigate("/cart")
                                setDropdownVisible(false)
                            }}
                            name={<p>Go to Cart</p>}
                            rounded={true} 
                            className="md:hover:text-blue text-[.8rem]"
                        />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Cart