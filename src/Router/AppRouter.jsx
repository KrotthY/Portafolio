import { Route, Routes } from "react-router-dom"
import { Login } from "../Auth/Pages/Login" 
import { TurismoRealRoutes } from "../Auth/Routes/TurismoRealRoutes"

const AppRouter = () => {
  return (
    <>
      <Routes>

        <Route path="inicio-sesion" element={ <Login /> } />
        <Route path="/*" element={ <TurismoRealRoutes /> } />


      </Routes>

    </>
  )
}

export default AppRouter