import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Button, Slider } from "@/components"
import { fetchProducts } from "@/utils/recipes"
import CircleType from "circletype"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faArrowRight } from "@fortawesome/free-solid-svg-icons"

const Home = () => {

    const getAppRef = useRef<HTMLParagraphElement>(null)
    useEffect(() => {
            new CircleType(getAppRef.current)
    },[])

    return (
        <div className="bg-gray-100 text-gray-800">
            {/* Main content */}
            <main className="mt-10">
            <div className="max-w-7xl mx-auto px-4">
                {/* Hero section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-left">
                        <h1 className="my-4 text-7xl">Get Your Favorite Food With Ease</h1>
                        <p className="my-9">Satisfy Your Hunger Pangs with a Wide Range of Delicious Meals from Top Restaurants - Fast and Reliable Delivery Guaranteed!</p>
                        <div className="flex flex-wrap items-center justify-center xs:flex-column lg:justify-between lg:flex-row px-6">
                            <Link to="/products"><Button buttonType="button" name={<p>Order Now</p>} rounded={true} /></Link>
                            <div className="relative h-48 w-48">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><p ref={getAppRef} className="animate-[spin_15s_linear_infinite]"> GET THE APP. GET THE APP. GET THE APP.</p></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><Link to="/phone-app"><Button buttonType="button" icon={<FontAwesomeIcon icon={faArrowRight} />} rounded={true}/></Link></div>
                            </div>
                        </div>
                    </div>
                    <div className="my-16">
                        <img src="/pexels-spice-hero.jpg" alt="Placeholder Image" className="w-full rounded-md shadow-lg" />
                    </div>
                </div>
    
                {/* Recipe Slider section */}
                <section className="grid grid-rows-1 grid-cols-1 lg:grid-cols-5 grid-rows-1 mt-16 gap-x-4 content-center">
                    <div className="lg:col-span-1 flex items-center justify-center my-3">
                        <p className="font-semibold text-2xl">Trending Recipes</p>
                    </div>
                    <div className="col-span-1 lg:col-span-2 my-auto">
                        <Slider 
                            getSlideData={fetchProducts} 
                            id="idMeal"
                            src= "strMealThumb"
                            label= "strMeal"
                            imageId="strMealThumb"
                            product={true}
                        />
                    </div>
                    <div className="row-span-1 flex items-center my-7 justify-center xl:justify-start">
                        <Link className="font-semibold underline underline-offset-8 decoration-yellow" to="/products">Explore More</Link>
                    </div>
                    <div className="row-span-1 lg:col-span-1 my-10">
                        <p className="text-2xl px-3"><FontAwesomeIcon icon={faStar} /></p>
                        <p className="font-semibold text-2xl my-2">We ensure quality food</p>
                        <p>We offer a range of healthy meal options that are made with fresh, high-quality ingredients.</p>
                    </div>
                </section>
            </div>
            </main>
      </div>
    )
}

export default Home