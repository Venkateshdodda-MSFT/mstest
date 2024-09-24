import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { clearCart, updateOrderCreated } from '@/features/cartSlice';
import { createOrder } from '@/utils/orders';

const Payment = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        country: '',
        postalCode: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const buildOrder = () => {
        // Simulate order creation logic here
        createOrder(
            "1",
            39.99,
            [{
                meal: {
                    idMeal: "31",
                    price: 33.99,
                    strMeal: "Seafood fideuà",
                    strMealThumb: "https://www.themealdb.com/images/media/meals/wqqvyq1511179730.jpg",
                    ratings: 3,
                    inStock: true,
                    fastDelivery: false,
                    strCategory: "Spanish"
                }, quantity: 1
            }]
        )
        dispatch(clearCart())
        dispatch(updateOrderCreated(true))
    };

    return (
        <div>
            {/* Credit Card Number */}
            <div className="form-field">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    placeholder="1234 1234 1234 1234"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    required
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                />
            </div>

            {/* Expiration Date */}
            <div className="form-field">
                <label htmlFor="expiryDate">Expiration Date</label>
                <input
                    type="text"
                    name="expiryDate"
                    id="expiryDate"
                    placeholder="MM / YY"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    required
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                />
            </div>

            {/* Security Code */}
            <div className="form-field">
                <label htmlFor="cvc">Security Code</label>
                <input
                    type="text"
                    name="cvc"
                    id="cvc"
                    placeholder="CVC"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    required
                    value={formData.cvc}
                    onChange={handleInputChange}
                />
            </div>

            {/* Country */}
            <div className="form-field">
                <label htmlFor="country">Country</label>
                <select
                    name="country"
                    id="country"
                    autoComplete="billing country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                >
                    <option value="">Select</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    {/* Add more country options as needed */}
                </select>
            </div>

            {/* Zip Code */}
            <div className="form-field">
                <label htmlFor="postalCode">Zip Code</label>
                <input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    placeholder="12345"
                    inputMode="numeric"
                    autoComplete="billing postal-code"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                />
            </div>

            {/* Pay Now Button */}
            <button
                type="button"
                onClick={buildOrder}
                className="pay-now-button"
            >
                Pay Now
            </button>
        </div>
    );
};

export default Payment;
