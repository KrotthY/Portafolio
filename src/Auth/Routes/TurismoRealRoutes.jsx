import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar, Footer } from "../../Ui"
import { Departament } from "../../Pages/Departament"
import  Tours  from "../../Pages/Tours"

export const TurismoRealRoutes = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="departamentos" element={ <Departament /> } />
      <Route path="tours" element={ <Tours /> } />

      <Route path="/" element={ <Navigate to ="departamentos"/> } />
    </Routes>
    <Footer/>
    </>
  )
}
