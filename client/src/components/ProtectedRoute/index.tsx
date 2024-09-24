import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { ThankYou } from "@/pages"

const ProtectedRoute = () => {

    const order: boolean = useSelector((state: RootState) => state.cart.orderCreated)
    if(!order){
        return (
            <div className="flex flex-col items-center justify-center h-60">
                <h1 className="text-3xl font-bold">Whoops! Looks like you got here by accident.</h1>
            </div>
        )
    } else {
        return (
            <ThankYou />
        )
    }
}

export default ProtectedRoute;