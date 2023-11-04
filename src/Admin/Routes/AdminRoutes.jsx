import {  Route, Routes } from "react-router-dom"
import { PanelAdministracion, Reportes, ServicioTurismo, Servicios, ServiciosTransportes, Usuarios } from "../Pages"
import { Sidebar } from "../Components/Sidebar/Sidebar"


const AdminRoutes = () => {
  return (
    <>
    <div className="flex h-screen">
    <Sidebar />
      <div className="flex-1 overflow-y-auto p-6">
        <Routes>
          <Route path="/admin/panel-administracion" element={ <PanelAdministracion /> } />
          <Route path="/admin/servicios-transporte" element={ <ServiciosTransportes /> } />
          <Route path="/admin/servicio-turismo" element={ <ServicioTurismo /> } />
          <Route path="/admin/servicios" element={ <Servicios /> } />
          <Route path="/admin/usuarios" element={ <Usuarios /> } />
          <Route path="/admin/reportes" element={ <Reportes /> } />
          <Route path="/admin/perfil" element={ <Reportes /> } />
        </Routes>
      </div>
      
      </div>
    </>
  )
}

export default AdminRoutes