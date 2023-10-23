import { Link } from "react-router-dom"
import { logoTurismoReal } from "../../Assets"

const ForgotPassword = () => {
  return (
    <>
     <div className="flex flex-col lg:flex-row min-h-screen justify-center bg-gray-100">
      
      <div className="w-3/5  flex items-center justify-center  select-none">
        <div className="bg-white p-4 sm:p-10 py-6 sm:py-20 rounded-3xl border-1 border-white shadow-lg w-full sm:w-3/4">
          <div className="flex flex-col items-center justify-center">
            <img className="w-24 h-24 rounded-full shadow-md" src={ logoTurismoReal } alt="Avatar" />
            <h1 className="text-4xl font-semibold py-10 text-gray-900">Portal de Turismo Real</h1>
            <p className="font-medium text-2xl text-gray-500 mt-4">Recuperar contraseña</p>
            <p className="text-sm text-gray-600 text-center mt-8 mb-6">Introduce tu correo electrónico para restablecer tu contraseña</p>
          </div>
          <div className="mt-8">
            <div className="py-2">
              <label className="text-lg font-medium">Correo electrónico</label>
              <input className="w-full border rounded-xl p-4 mt-1" placeholder="Ingresa tu Correo electrónico" />
            </div>

          </div>
          <div className="mt-4 flex justify-center items-center">
            <Link
              to="/" className="cursor-pointer"
            >
  
              <button type="button" 
                className=" w-full select-none rounded-lg bg-blue-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                Enviar
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

export default ForgotPassword