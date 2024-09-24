import { Formik, Form, Field, ErrorMessage } from 'formik'
import { State, IState } from 'country-state-city'
import { Rating, Payment } from '@/components'
import { RootState } from "@/app/store"
import { orderSchema as validationSchema } from '@/schemas/validationSchemas'
import { useSelector } from "react-redux"

const initialValues: CheckoutFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
}

const stateOptions: StateOption[] = State.getStatesOfCountry("US").map((state: IState) => ({
    label: state.name,
    value: state.isoCode,
}))

const CheckoutForm = () => {

    const cart = useSelector((state: RootState) => state.cart.items)
    const total = (Math.round(cart.reduce((acc: number, curr: {[key:string]: any}) => 
        acc + (curr.meal.price * curr.quantity), 0.00) * 100) / 100).toFixed(2);    

    return (
        <div className="bg-[#343a40] min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-6 justify-center items-center p-4">
            <div className="bg-white cols-span-1 text-[#343a40] p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-6">Checkout</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400)
                    }}
                >
                    <Form className="grid grid-cols-1 gap-6">
                        <div className="col-span-1">
                            <label htmlFor="firstName" className="block text-left mx-3">First Name</label>
                            <Field name="firstName" type="text" className="mt-1 p-2 border rounded w-full" />
                            <ErrorMessage name="firstName" component="div" className="text-[#d10819] text-sm" />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="lastName" className="block text-left mx-3">Last Name</label>
                            <Field name="lastName" type="text" className="mt-1 p-2 border rounded w-full" />
                            <ErrorMessage name="lastName" component="div" className="text-[#d10819] text-sm" />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="email" className="block text-left mx-3">Email</label>
                            <Field name="email" type="email" className="mt-1 p-2 border rounded w-full" />
                            <ErrorMessage name="email" component="div" className="text-[#d10819] text-sm" />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="address" className="block text-left mx-3">Shipping Address</label>
                            <Field name="address" type="text" className="mt-1 p-2 border rounded w-full" />
                            <ErrorMessage name="address" component="div" className="text-[#d10819] text-sm" />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="city" className="block text-left mx-3">Shipping City</label>
                            <Field name="city" type="text" className="mt-1 p-2 border rounded w-full" />
                            <ErrorMessage name="city" component="div" className="text-[#d10819] text-sm" />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="state" className="block text-left mx-3">Shipping State</label>
                            <Field as="select" name="state" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="">Select a state...</option>
                                {stateOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="state" component="div" className="text-[#d10819] text-sm" />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="zipCode" className="block text-left mx-3">Shipping Zip Code</label>
                            <Field name="zipCode" type="text" className="mt-1 p-2 border rounded w-full" />
                            <ErrorMessage name="zipCode" component="div" className="text-red text-sm" />
                        </div>

                        <div className="col-span-1">
                            <Payment totalAmount={Number(total)} />
                        </div>
                    </Form>
                </Formik>
            </div>
            <div className="bg-white cols-span-1 text-[#343a40] p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <ol className="Tiempos">
                    {
                        cart.length > 0 ? cart.map((prod: { [key: string]: any }) => (
                            <li key={prod.meal.strMeal} className="flex flex-col items-center space-x-4 bg-white shadow-lg p-4 my-4 rounded-lg shadow md:flex-row md:width-full hover:bg-gray-100">
                                <img className="w-full max-w-[5rem] fluid rounded-lg" src={prod.meal.strMealThumb} alt={prod.meal.strMeal} />
                                <p>{prod.meal.strMeal}</p>
                                <p>${prod.meal.price.toFixed(2)}</p>
                                <Rating rating={prod.meal.ratings} className="px-6 pb-2" />
                            </li>
                        )) : <li className="Tiempos text-lg">Your cart is empty!</li>
                    }
                </ol>
                <h1 className="text-xxl mb-3">Subtotal ({cart.length}) items</h1>
                <p className="Manrope bold mb-3">Total: ${total}</p>`
            </div>
        </div>
    )
}

export default CheckoutForm