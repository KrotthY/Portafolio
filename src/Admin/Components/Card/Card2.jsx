

const Card2 = () => {
  return (
    <>
    <div className=" m-2 group px-10 py-5 bg-gray/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#b9ddfb6b] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&amp;_p]:delay-200 [&amp;_p]:transition-all">
      <div className="px-6 py-8 sm:p-10 sm:pb-6">
        <div className="grid items-center justify-center w-full grid-cols-1 text-left">
          <div>
            <h2
              className="text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl"
            >
              Starter
            </h2>
            <p className="mt-2 text-sm text-gray-500">Suitable to grow steadily.</p>
          </div>
          <div className="mt-6">
            <p>
              <span className="text-5xl font-light tracking-tight text-black">
                $25
              </span>
              <span className="text-base font-medium text-gray-500"> /mo </span>
            </p>
          </div>
        </div>
      </div>

    </div>

    
    
    
    </>
  )
}

export default Card2