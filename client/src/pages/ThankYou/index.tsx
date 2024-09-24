import { Link } from "react-router-dom";

const ThankYou = () => {

    return (
        <div className="flex flex-col items-center justify-center h-60">
            <h1 className="text-3xl font-bold">Thank you for your order!</h1>
            <p>Click <Link to="/products" className="text-blue">here</Link> to return shopping</p>
        </div>
    );
}

export default ThankYou;