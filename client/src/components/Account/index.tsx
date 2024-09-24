import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { RootState } from "@/app/store"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "@/features/customerSlice"

const Account = () => {

    const customer: Customer = useSelector((state: RootState) => state.customer.customer)
    const loggedIn: string = customer.customerId
    const dispatch = useDispatch()
    const handleLogout = () => dispatch(logout())

    return(
        <div className="flex flex-row space-x-4">      
            <Link to="/login" data-testid="nav-account-link">
                <button>
                    <FontAwesomeIcon icon={faUser} /> <span className="text-sm">{loggedIn ? "My Account" : "Login"}</span>
                </button>
            </Link>
            { 
                loggedIn ? 
                    <button className="space-x-1" onClick={handleLogout}>
                        <span className="text-sm">Sign Out</span>
                        <FontAwesomeIcon icon={faRightFromBracket} /> 
                    </button>
                : "" 
            }
        </div>
    )
}

export default Account
