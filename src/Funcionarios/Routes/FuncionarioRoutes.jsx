import { Route, Routes } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar/Sidebar";
import { PrivateRoutes } from "../../Router";
import { CheckIn } from "../Pages";




const FuncionarioRoutes = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path={ PrivateRoutes.COLLABORATOR_CHECK_IN } element={<CheckIn />} />
        </Routes>
      </div>
    </div>
  );
};

export default FuncionarioRoutes;
