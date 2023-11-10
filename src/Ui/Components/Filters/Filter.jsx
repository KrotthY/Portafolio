
const Filter = () => {
  return (
    <>
      <div className="flex flex-wrap justify-around items-center gap-4 bg-gray-50 ">
        <div className="flex flex-col sm:flex-row items-center  p-6 w-full sm:w-auto justify-around border-2 rounded-lg border-white"> 
            <label className=" mr-3 text-sm text-blue-500 font-semibold">Zona</label>
            <div className="w-full sm:w-64">
                <select id="clinica" defaultValue="0" name="clinica" placeholder="Selecciona una Regón" className="w-full border-blue-500/50 rounded border-4 border-double p-1 hover:border-solid focus:outline-none">
                    <option value="0">Region Metropolitana</option>
                </select>
            </div>
        </div>
        <div className="flex flex-col items-center sm:flex-row gap-4  p-6 w-full sm:w-auto justify-around border-2 rounded-lg border-white">
            <label className=" text-sm text-blue-500 font-semibold ">Disponibilidad</label>
            <div className="flex items-center flex-col sm:flex-row gap-2">
                <label htmlFor="fechaDesde" className="mr-1 text-sm text-blue-500">Desde:</label>
                <input 
                    min="2023-10-01" 
                    name="fechaDesde" 
                    id="fechaDesde" 
                    className="border-blue-500/50 rounded border-4 p-1 border-double hover:border-solid focus:outline-none" 
                    type="date"
                />
            </div>
            <div className="flex flex-col items-center sm:flex-row gap-2">
                <label htmlFor="fechaHasta" className="mr-1 text-sm text-blue-500">Hasta:</label>
                <input 
                    min="2023-10-01" 
                    max="2025-10-01" 
                    name="fechaHasta" 
                    id="fechaHasta" 
                    className="border-blue-500/50 rounded border-4 p-1 border-double hover:border-solid focus:outline-none" 
                    type="date"
                />
            </div>
        </div>

        <div className="flex items-center gap-4  p-6 w-full font-semibold sm:w-auto ">
            <button className="flex items-center justify-between font-semibold w-full px-4 py-2 text-base text-white bg-blue-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" height="1rem" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                Buscar
            </button>
        </div>

      </div>

    </>
  )
}

export default Filter