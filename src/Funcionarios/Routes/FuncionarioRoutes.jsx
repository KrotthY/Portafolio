import { Route, Routes } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar/Sidebar";
import { PrivateRoutes } from "../../Router";
import { lazy } from "react";

const CheckInFuncionario = lazy(() => import('../Pages/CheckIn'))
const CheckOutFuncionario = lazy(() => import('../Pages/CheckOut'))

const FuncionarioRoutes = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path={ PrivateRoutes.COLLABORATOR_CHECK_IN } element={<CheckInFuncionario />} />
          <Route path={ PrivateRoutes.COLLABORATOR_CHECK_OUT }  element={<CheckOutFuncionario />} />
        </Routes>
      </div>
    </div>
  );
};

export default FuncionarioRoutes;
