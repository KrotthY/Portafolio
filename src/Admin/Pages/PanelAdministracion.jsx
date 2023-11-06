import { Typography } from "@material-tailwind/react"
import Card2 from "../Components/Card/Card2"


const PanelAdministracion = () => {

  return (
    <>
      <Typography variant="h1" className="text-3xl">Departamentos</Typography>
      <div className=" grid w-full justify-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 mt-20">
      <Card2/>
      <Card2/>
      <Card2/>
      <Card2/>

      </div>
    </>
  )
}


export default PanelAdministracion