import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar, Footer } from "../../Ui"
import { PublicRoutes } from "../../Router/Routes"
import { lazy } from "react"

const Departament = lazy(() => import('../Pages/Departament'))
const DepartmentDetails = lazy(() => import('../Pages/DepartmentDetails'))
const Tours = lazy(() => import('../Pages/Tours'))


const TurismoRealRoutes = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path={ PublicRoutes.DEPARTAMENTOS } element={ <Departament /> } />
      <Route path={ PublicRoutes.DEPARTAMENTOS_ID } element={ <DepartmentDetails /> } />
      <Route path={ PublicRoutes.TOURS } element={ <Tours /> } />
      <Route path={ PublicRoutes.HOME} element={ <Navigate to ={PublicRoutes.DEPARTAMENTOS}/> } />
    </Routes>
    <Footer/>
    </>
  )
}

export default TurismoRealRoutes