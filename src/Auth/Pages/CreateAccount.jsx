import { Link } from "react-router-dom"
import { logoTurismoReal } from "../../Assets"


const CreateAccount = () => {
  return (
    <>
    <div className="flex flex-col lg:flex-row min-h-screen justify-center bg-gray-100">
      
    <div className="w-3/5  flex items-center justify-center  select-none">
      <div className="bg-white p-4 sm:p-10 py-6 sm:py-20 rounded-3xl border-1 border-white shadow-lg w-full sm:w-3/4">
        <div className="flex flex-col items-center justify-center">
          <img className="w-24 h-24 rounded-full shadow-md" src={ logoTurismoReal } alt="Avatar" />
          <h1 className="text-4xl font-semibold py-10 text-gray-900">Portal de Turismo Real</h1>
          <p className="font-medium text-2xl text-gray-500 mt-4">Crear Cuenta</p>
        </div>
        <div className="mt-8">
          <div className="flex justify-around  items-center">
            <div className="py-2 w-full mr-1">
              <label className="text-lg font-medium">Nombre</label>
              <input className="w-full border rounded-xl p-4 mt-1" placeholder="Ingresa tu nombre" />
            </div>
            <div className="py-2 w-full ml-1">
                <label className="text-lg font-medium">Apellido</label>
                <input className="w-full border rounded-xl p-4 mt-1" placeholder="Ingresa tu apellido" />
            </div>
          </div>
          <div className="py-2">
            <label className="text-lg font-medium">Correo electrónico</label>
            <input className="w-full border rounded-xl p-4 mt-1" placeholder="Ingresa tu Correo electrónico" />
          </div>
          <div className="py-2">
            <label className="text-lg font-medium">Contraseña</label>
            <input type="password" className="w-full border rounded-xl p-4 mt-1" placeholder="Ingresa tu Contraseña" />
          </div>

        </div>
        <div className="mt-4">
          <Link
            to="/" className="cursor-pointer"
          >

            <button type="button" 
              className=" w-full select-none rounded-lg bg-blue-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
              Registrate !
            </button>
          </Link>
        </div>
        <p className="text-xs text-gray-600 text-center mt-8">&copy; 2023 Turismo Real</p>
      </div>
    </div>
    </div>
    
    </>
  )
}


export default CreateAccount