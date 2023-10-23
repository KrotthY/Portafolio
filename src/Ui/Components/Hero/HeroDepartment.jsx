
import { Typography } from '@material-tailwind/react'
import { departmentOne } from '../../../Assets'

const HeroDepartment = () => {
  return (
    <>
      <div className="py-10 bg-gray-50 flex items-center">
        <section className="w-full bg-cover bg-center py-32" style={{ backgroundImage: ` linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),  url(${departmentOne})` }}>
          <div className="container mx-5 text-left text-zinc-200">
          <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Bienvenidos
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Planica tu viaje con nosotros, los mejores departamentos en un solo lugar.
            </Typography>
          </div>
        </section>
      </div>


    </>
  )
}

export default HeroDepartment