import { Navigate, useParams } from "react-router-dom"


const DepartmentDetails = () => {

  const { id }  =  useParams();

  if(!id){

    return <Navigate to ="departamentos"/>
  }


  return (
    <>
    <h1>Hola {id}</h1>
    </>
  )
}

export default DepartmentDetails