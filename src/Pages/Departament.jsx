import { IconBedroom, IconMoney, IconStarHalf, IconTv, IconWifi } from "../Assets"
import { Filter, HeroDepartment } from "../Ui"

export const Departament = () => {
  return (
    <>
    <HeroDepartment />
    <Filter />
    <section id="main-content" className="mx-auto w-full max-w-container px-4 sm:px-6 py-12  lg:px-8 bg-gray-50  ">
      
      <div className="mx-auto grid w-full justify-center  xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-y-16">
        
        <div className="cards my-2 mx-2 max-w-xs  rounded-xl bg-white  text-gray-700 shadow-xl">
          <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
            <img
              src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
              alt="ui/ux review check"
            />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
            <button
              className="!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-dark="true"
            >
              <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">

              </span>
            </button>
          </div>
          <div className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <h5 className="block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
                Cabaña del Bosque, Temuco
              </h5>
              <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                <IconStarHalf/>
                4.3
              </p>
            </div>
            <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
              Departamento con 2 Habitaciones con vista al mar.
            </p>
            <div className="group mt-8 inline-flex flex-wrap items-center gap-2">
              <span
                data-tooltip-target="money"
                className="cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70"
              >
                <IconMoney />
              </span>
              <span
                data-tooltip-target="wifi"
                className="cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70"
              >
                < IconWifi /> 
              </span>
          
              <span
                data-tooltip-target="bedrooms"
                className="cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70"
              >
                <IconBedroom />
              </span>

              <span
                data-tooltip-target="tv"
                className="cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70"
              >
                <IconTv />
              </span>
              <span
                data-tooltip-target="more"
                className="cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70"
              >
                +20
              </span>

            </div>
          </div>
          <div className="p-6 pt-3">
            <button
              className="block w-full select-none rounded-lg bg-blue-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
            >
              Reservar
            </button>
          </div>
        </div>
        
      </div>
    </section>

    </>
  )
}
