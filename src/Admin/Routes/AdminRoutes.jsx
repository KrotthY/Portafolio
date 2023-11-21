import {  Route, Routes } from "react-router-dom"
import { PanelAdministracion, Reportes, ServicioTurismo, Servicios, ServiciosTransportes, Usuarios,Perfil, Inventario } from "../Pages"
import { Sidebar } from "../Components/Sidebar/Sidebar"
import { PrivateRoutes } from "../../Router"



const AdminRoutes = () => {
  return (
    <>
    <div className="flex h-screen">
    <Sidebar />
      <div className="flex-1 overflow-y-auto p-6">
        <Routes>
          <Route path={ PrivateRoutes.PANEL_ADMIN } element={ <PanelAdministracion /> } />
          <Route path={ PrivateRoutes.SERVICIOS_TRANSPORTE }   element={ <ServiciosTransportes /> } />
          <Route path={ PrivateRoutes.SERVICIOS_TURISMO }   element={ <ServicioTurismo /> } />
          <Route path={ PrivateRoutes.INVENTARIO }   element={ <Inventario /> } />
          <Route path={ PrivateRoutes.SERVICIOS }  element={ <Servicios /> } />
          <Route path={ PrivateRoutes.USUARIOS }  element={ <Usuarios /> } />
          <Route path={ PrivateRoutes.REPORTES }  element={ <Reportes /> } />
          <Route path={ PrivateRoutes.PERFIL_ADMIN }  element={ <Perfil /> } />
        </Routes>
      </div>
      
      </div>
    </>
  )
}

export default AdminRoutes