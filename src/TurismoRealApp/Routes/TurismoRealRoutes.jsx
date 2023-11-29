import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar, Footer } from "../../Ui"
import { PublicRoutes } from "../../Router/Routes"
import { Departament, DepartmentDetails, PerfilCliente, Tours } from "../Pages"





const TurismoRealRoutes = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path={ PublicRoutes.DEPARTAMENTOS } element={ <Departament /> } />
      <Route path={ PublicRoutes.DEPARTAMENTOS_ID } element={ <DepartmentDetails /> } />
      <Route path={ PublicRoutes.TOURS } element={ <Tours /> } />
      <Route path={ PublicRoutes.PERFIL_CLIENTE } element={ <PerfilCliente /> } />
      <Route path={ PublicRoutes.HOME} element={ <Navigate to ={PublicRoutes.DEPARTAMENTOS}/> } />
    </Routes>
    <Footer/>
    </>
  )
}

export default TurismoRealRoutes