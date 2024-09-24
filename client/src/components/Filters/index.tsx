import { useState } from "react"
import {
    Formik,
    Form,
    Field,
} from "formik"
import {
    sortPrice,
    sortStock,
    sortFastDelivery,
    sortRating,
    clearFilters,
    setKeyword
} from '@/features/recipeSlice'
import Rating from "@/components/Rating"
import Button from "@/components/Button"
import { ReactNode } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronDown, faX } from "@fortawesome/free-solid-svg-icons"
import { useAppDispatch } from '@/hooks'
import { RootState } from "@/app/store"
import { useSelector } from "react-redux"


interface Props {
    resetPage: Function
}

interface MyFormValues {
    sortBy: string
}

const Filters = ({ resetPage }: Props) => {

    const dispatch = useAppDispatch()
    const [showFilters, setShowFilters] = useState(false)
    const filterList = useSelector((state: RootState) => state.recipe.filters)

    const { 
        sortByPrice,
        includeOutOfStock,
        fastDeliveryOnly,
        minRating
    } = filterList

    const initialValues: MyFormValues = { sortBy: '' }
    const filter_list: {value: string, type: string, order: string, action: Function, checked: boolean }[] = [
        { value: "Ascending", type: "radio", order: "lowToHigh", action: () => sortPrice("lowToHigh"), checked: sortByPrice === "lowToHigh" },
        { value: "Descending", type: "radio", order: "highToLow", action: () => sortPrice("highToLow"), checked: sortByPrice === "highToLow" },
        { value: "Include Out of Stock", type: "checkbox", order: "byStock", action: () => sortStock(), checked: includeOutOfStock },
        { value: "Fast Delivery Only", type: "checkbox", order: "byFastDelivery", action: () => sortFastDelivery(), checked: fastDeliveryOnly },
    ]

    const returnForm = (mobile: boolean): ReactNode => (
        <div className={`bg-[#343a40] flex flex-col px-8 text-white py-6 overflow-x-auto justify-center ` + (mobile ? `flex lg:hidden w-full` : "hidden lg:block w-full md:h-[86vh]")}>
            <span className="text-xl">Filter Recipes</span>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    console.log({ values, actions });
                    actions.setSubmitting(false);
                }}
            >
                <Form className={`md:flex md:flex-col wrap md:my-8 md:mx-2 p-1`}>
                    {filter_list.map((filter) => (
                        <span key={filter.value} className={mobile ? "flex items-center space-x-4 mr-4 my-2" : "md:flex md:space-x-4 pb-4 flex-row flex-nowrap"}>
                            <Field
                                type={filter.type}
                                name="filter"
                                value={filter.value}
                                onChange={() => {
                                    resetPage(0)
                                    dispatch(filter.action())}}
                                checked={filter.checked}
                            />
                            {<p>{filter.value}</p>}
                        </span>
                    ))}
                    <div className={mobile ? "flex items-center" : "flex align-middle md:flex md:flex-row mb-3"}>
                        <label className="flex my-auto">Rating:</label>
                        <Rating
                            rating={minRating}
                            onClick={(i: number) => {
                                resetPage(0)
                                dispatch(sortRating(i + 1))
                            }}
                            className="cursor-pointer mx-2 my-3"
                        />
                    </div>
                    <Button 
                        buttonType="button"
                        name={<p>Clear Filters</p>} 
                        rounded={true}
                        action={() => {
                            resetPage(0)
                            dispatch(clearFilters())
                        }}
                        className="max-w-[10rem] my-6" 
                    />
                    {   
                        filterList.searchQuery.length ?
                        <div className="flex flex-row justify-center items-center bg-[#406065] text-white my-6 px-6 py-2 rounded-full max-w-[10rem]">
                            <p>{filterList.searchQuery}</p>
                            <button className="mx-2">
                                    <FontAwesomeIcon onClick={() => {
                                        resetPage(0)
                                        dispatch(setKeyword(""))
                                    }} icon={faX} />
                            </button> 

                        </div>: ""
                    }

                </Form>
            </Formik>
        </div>
    )

    return (
        <div>
            { /** Mobile View */}
            <div className="bg-[#343a40] w-full h-[max-content] text-white p-4 flex items-center justify-between lg:hidden">
                <span>Filters</span>
                {
                    <FontAwesomeIcon 
                        className="cursor-pointer text-xl mx-4" 
                        onClick={() => setShowFilters(!showFilters ? true : false)} 
                        icon={!showFilters ? faChevronRight : faChevronDown} 
                    />
                }
            </div>
            {showFilters ? returnForm(true) : ""}
            {/**Desktop View */}
            {returnForm(false)}
        </div>
    )
}

export default Filters