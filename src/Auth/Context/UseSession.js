import { useContext } from "react";
import SessionContext from "./SessionContext";

const useSession = () => {
  return useContext(SessionContext);
};

export default useSession;
