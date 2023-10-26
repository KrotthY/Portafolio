import { Navigate, useParams } from "react-router-dom"


const DepartmentDetails = () => {

  const { id }  =  useParams();

  if(!id){
    return <Navigate to ="departamentos"/>
  }


  return (
    <>
    <section className="py-16 px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid w-full grid-cols-1 md:grid-cols-2">
          <div className="mb-10 flex h-full w-full justify-center md:mb-0">
            <div className="flex w-36 flex-col gap-3">
              <img src="https://material-taillwind-pro-ct-tailwind-team.vercel.app/image/product-10.png" className="md:h-[140px] md:w-[130px]" alt="prod"/>
              <img src="https://material-taillwind-pro-ct-tailwind-team.vercel.app/image/product-7.png" className="md:h-[140px] md:w-[130px]" alt="prod"/>
              <img src="https://material-taillwind-pro-ct-tailwind-team.vercel.app/image/product-8.png" className="md:h-[140px] md:w-[130px]" alt="prod"/>
              <img src="https://material-taillwind-pro-ct-tailwind-team.vercel.app/image/product-9.png" className="cmR4bA md:h-[110px] md:w-[110px] " alt="prod"/>
            </div>
            <div className="h-1 w-full">
              <img src="https://material-taillwind-pro-ct-tailwind-team.vercel.app/image/product-6.png" alt=""/>
            </div>
          </div>
          <div className="h-full w-full">
            <h4 className="block antialiased tracking-normal leading-5 font-sans text-2xl font-semibold letter decoration-inherit mb-2">
              Pink Blouse
            </h4>
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-5 decoration-inherit">
              $1,490
            </h6>
            <p className="block antialiased font-sans text-base font-light decoration-inherit mb-5 mt-3  leading-[27px] text-gray-500">
              As we live, our hearts turn colder. Cause pain is what we go through as we become older. We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give others a hand. We get our heart broken by people we love, even that we give them all we have. Then we lose family over time. What else could rust the heart more over time? Blackgold.
            </p>
            <div className="mb-5 flex items-center gap-2 ">
              <div className="inline-flex items-center text-amber-500">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 decoration-inherit Y3Vyc29ycG9pbnRlcg dGV4dHllbGxvdzcwMA w-6 h-6">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd">
                    </path>
                    </svg>
                </span>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 decoration-inherit Y3Vyc29ycG9pbnRlcg dGV4dHllbGxvdzcwMA w-6 h-6">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd">
                    </path>
                  </svg>
                </span>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 decoration-inherit Y3Vyc29ycG9pbnRlcg dGV4dHllbGxvdzcwMA w-6 h-6">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd">
                    </path>
                  </svg>
                </span>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 decoration-inherit Y3Vyc29ycG9pbnRlcg dGV4dHllbGxvdzcwMA w-6 h-6">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd">
                    </path>
                  </svg>
                </span>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 decoration-inherit Y3Vyc29ycG9pbnRlcg dGV4dGJsdWVncmF5NTAw w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path></svg>
                </span>
              </div>
              <p className="block antialiased font-sans text-base leading-5 decoration-inherit text-md font-bold text-gray-700">100 reviews</p>
            </div>
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-5 text-blue-gray-900">Color</h6>
            <div className="mb-8 mt-3 flex items-center gap-2">
              <div className="h-5 w-5 rounded-md border-2 border-blue-gray-500 bg-pink-500 "></div>
              <div className="h-5 w-5 rounded-md border-2 border-blue-gray-100 "></div>
              <div className="h-5 w-5 rounded-md border-2 border-blue-gray-100 bg-gray-900 "></div>
            </div>
            <div className="mb-5 flex w-full items-center gap-3 md:w-1/2 ">
              <button className="YWxpZ25taWRkbGU select-none font-sans  dGV4dGN0cg dXBwZXJjYXNl dHJhbnNpdGlvbmFsbA disabled:b3BhY2l0eTUw disabled:c2hhZG93bm9uZQ disabled:cG9pbnRlcmV2ZW50c25vbmU dGV4dHhz cHkz cHg2 cmRsZw bg-gray-900 dGV4dHdoaXRl c2hhZG93bWQ c2hhZG93Z3JheTkwMC8xMA hover:c2hhZG93bGc hover:c2hhZG93Z3JheTkwMC8yMA focus:b3BhY2l0eQ[0.85] focus:c2hhZG93bm9uZQ active:b3BhY2l0eQ[0.85] active:c2hhZG93bm9uZQ YmdncmF5OTAw block w-full" type="button">
                Add to Cart
              </button>
              <button className="relative YWxpZ25taWRkbGU select-none font-sans Zm9udG1lZGl1bQ dGV4dGN0cg dXBwZXJjYXNl dHJhbnNpdGlvbmFsbA disabled:b3BhY2l0eTUw disabled:c2hhZG93bm9uZQ disabled:cG9pbnRlcmV2ZW50c25vbmU dzEw bWF4dw[40px] aDEw bWF4aA[40px] cmRsZw dGV4dHhz dGV4dGdyYXk5MDA hover:YmdncmF5OTAwLzEw active:YmdncmF5OTAwLzIw c2hyaW5rMA" type="button">
                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="aDY dzY">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path></svg>
                </span>
              </button>
            </div>

            <div className="block relative w-full">
              <button type="button" className="flex justify-between items-center w-full py-4 border-b-2 border-blue-gray-100 text-blue-gray-700 antialiased font-sans text-xl text-left font-semibold leading-5 select-none hover:text-blue-gray-900 transition-colors">
                Features
                <span className="ml-4">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5 0C5.26522 0 5.51957 0.105357 5.70711 0.292893C5.89464 0.48043 6 0.734784 6 1V4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5C10 5.26522 9.89464 5.51957 9.70711 5.70711C9.51957 5.89464 9.26522 6 9 6H6V9C6 9.26522 5.89464 9.51957 5.70711 9.70711C5.51957 9.89464 5.26522 10 5 10C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H4V1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0Z" fill="#212121"></path></svg>
                </span>
              </button>
              <div className="overflow-hidden h-auto" >
                <div className="block w-full py-4 hover:text-gray-700 antialiased font-sans text-md font-light leading-6  text-gray-500">
                  <ul>
                    <li className="mb-3">The jacket could be made from a weather-resistant or waterproof fabric, such as Gore-Tex or a similar technology, to keep the wearer dry and comfortable in rainy or windy conditions.</li>
                    <li className="mb-3">Including multiple pockets with different sizes and functionalities, such as zippered pockets for secure storage, interior pockets for valuables.</li>
                    <li>The jacket could feature adjustable cuffs and a drawstring hem, allowing the wearer to customize the fit and seal out cold drafts, making it suitable for various weather conditions.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="block relative w-full">
              <button type="button" className="flex justify-between items-center w-full py-4 border-b-2 border-blue-gray-100 text-blue-gray-700 antialiased font-sans text-xl text-left font-semibold leading-5 select-none hover:text-blue-gray-900 transition-colors">
                Product Care
                <span className="ml-4">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5 0C5.26522 0 5.51957 0.105357 5.70711 0.292893C5.89464 0.48043 6 0.734784 6 1V4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5C10 5.26522 9.89464 5.51957 9.70711 5.70711C9.51957 5.89464 9.26522 6 9 6H6V9C6 9.26522 5.89464 9.51957 5.70711 9.70711C5.51957 9.89464 5.26522 10 5 10C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H4V1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0Z" fill="#212121">
                    </path>
                  </svg>
                </span>
              </button>
              <div className="overflow-hidden" >
                <div className="block w-full py-4 hover:text-gray-700 antialiased font-sans text-md font-light leading-6  text-gray-500">
                  We re not always in the position that we want to be at. We re constantly growing. We re constantly making mistakes. We re constantly trying to express ourselves and actualize our dreams.
                </div>
              </div>
            </div>
            <div className="block relative w-full">
              <button type="button" className="flex justify-between items-center w-full py-4 border-b-2 border-blue-gray-100 text-blue-gray-700 antialiased font-sans text-xl text-left font-semibold leading-5 select-none hover:text-blue-gray-900 transition-colors">
                Shipping &amp; Returns
                <span className="ml-4">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5 0C5.26522 0 5.51957 0.105357 5.70711 0.292893C5.89464 0.48043 6 0.734784 6 1V4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5C10 5.26522 9.89464 5.51957 9.70711 5.70711C9.51957 5.89464 9.26522 6 9 6H6V9C6 9.26522 5.89464 9.51957 5.70711 9.70711C5.51957 9.89464 5.26522 10 5 10C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H4V1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0Z" fill="#212121">
                    </path>
                  </svg>
                </span>
              </button>
              <div className="overflow-hidden" >
                <div className="block w-full py-4 hover:text-gray-700 antialiased font-sans text-md font-light leading-6  text-gray-500">
                  We re not always in the position that we want to be at. We re constantly growing. We re constantly making mistakes. We re constantly trying to express ourselves and actualize our dreams.
                </div>
              </div>
            </div>
            <div className="block relative w-full">
              <button type="button" className="flex justify-between items-center w-full py-4 border-b-2 border-blue-gray-100 text-blue-gray-700 antialiased font-sans text-xl text-left font-semibold leading-5 select-none hover:text-blue-gray-900 transition-colors">
                Warranty
                <span className="ml-4">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5 0C5.26522 0 5.51957 0.105357 5.70711 0.292893C5.89464 0.48043 6 0.734784 6 1V4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5C10 5.26522 9.89464 5.51957 9.70711 5.70711C9.51957 5.89464 9.26522 6 9 6H6V9C6 9.26522 5.89464 9.51957 5.70711 9.70711C5.51957 9.89464 5.26522 10 5 10C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H4V1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0Z" fill="#212121">
                    </path>
                  </svg>
                </span>
              </button>
              <div className="overflow-hidden" >
                <div className="block w-full py-4 hover:text-gray-700 antialiased font-sans text-md font-light leading-6 text-gray-500">
                  We re not always in the position that we want to be at. We re constantly growing. We re constantly making mistakes. We re constantly trying to express ourselves and actualize our dreams.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default DepartmentDetails