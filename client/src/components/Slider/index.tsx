import { useState, useEffect } from "react" 
import "keen-slider/keen-slider.min.css"
import { Loading } from "@/components"
import { useKeenSlider } from "keen-slider/react"
import { useNavigate } from "react-router-dom"

interface Props {
    getSlideData: Function
    id: string,
    src: string,
    label: string,
    action?: Function,
    imageId: string,
    initialSlide?: number,
    product: boolean,
}


const Slider = ({ getSlideData, id, src, label, initialSlide, product }: Props) => {

    const [slideData, setSlideData] = useState<Object[]>([])
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [loaded, setLoaded] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleImgClick = (slide: any): void => {
      if(product){
        navigate("/product/"+slide.strMeal+ "+" + slide.idMeal)
      }
    }

    const getSlides = async(): Promise<void> => {
      const data = await getSlideData()
      setSlideData(data)
      setTimeout(() => instanceRef?.current?.update(), 50);       
    }

    useEffect(() => {
        getSlides()
    },[])

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        breakpoints: {
            "min-width: 200px)": {
                slides: { perView: 1, spacing: 1}
            },
            "(min-width: 400px)": {
                slides: { perView: 2, spacing: 5 },
            },
            "(min-width: 800px": {
                slides: { perView: 2, spacing: 15}
            }
        },
        initial: initialSlide || 1,
        loop: true,
        mode: "free-snap",
        created(){
            setLoaded(true)
        },
        slideChanged(slider){
            setCurrentSlide(slider.track.details.rel)
        }
    })

    return (
        <>
          <div className="relative flex flex-row">
            <div ref={sliderRef} className="keen-slider">
            {
                Array.isArray(slideData) && slideData.length > 0 ? slideData.map((slide: {[key: string]: any}, index: number) => 
                    <div key={slide[id]} className={`keen-slider__slide number-slide${index}`}>
                        <div className="max-w-sm rounded overflow-hidden shadow-lg">
                            <img src={slide[src]} alt="recipe" className="w-full cursor-pointer" onClick={() => handleImgClick(slide)} />
                            <p className="font-bold text-xl mb-2">{slide[label].split(" ").slice(0, 2).join(" ")}</p>
                        </div>
                    </div>
                ) : 
                  [1,2,3,4,5].map((__, index: number) => 
                  <div key={index} className={`keen-slider__slide number-slide${index}`}>
                    <div className={`bg-grey bg-opacity-30 flex justify-center items-center`}>
                        <Loading height="h-[10rem]" width="w-[10rem]" />
                    </div>
                  </div>
                )
            }
            </div>
            {loaded && instanceRef.current && (
              <>
                <Arrow
                  left
                  onClick={(e: any) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                  disabled={currentSlide === 0}
                />
    
                <Arrow
                  onClick={(e: any) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                  disabled={
                    currentSlide ===
                    slideData.length - 1
                  }
                />
              </>
            )}
          </div>
          {loaded && instanceRef.current && (
            <div className="dots">
              {[
                ...Array(slideData.length).keys(),
              ].map((idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx)
                    }}
                    className={"dot" + (currentSlide === idx ? " active" : "")}
                  ></button>
                )
              })}
            </div>
          )}
        </>
      )
    }
    
    function Arrow(props: {
      disabled: boolean
      left?: boolean
      onClick: (e: any) => void
    }) {
      const disabled = props.disabled ? " arrow--disabled" : ""
      return (
        <svg
          onClick={props.onClick}
          className={`h-10 w-10 absolute top-1/2 transform -translate-y-1/2 cursor-pointer fill-white ${
            props.left ? "left-[5px]" : "left-auto right-[5px]"
          } ${disabled}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          {props.left && (
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
          )}
          {!props.left && (
            <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
          )}
        </svg>
      )
    }
  

export default Slider