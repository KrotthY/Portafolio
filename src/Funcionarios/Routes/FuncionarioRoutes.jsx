import { Route, Routes } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar/Sidebar";
import Funcionario from "../Pages/Funcionario";

const FuncionarioRoutes = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="colaborador/check-in" element={<Funcionario />} />
          <Route path="colaborador/check-out" element={<Funcionario />} />
        </Routes>
      </div>
    </div>
  );
};

export default FuncionarioRoutes;
