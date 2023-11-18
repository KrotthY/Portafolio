import { Carousel,Typography, Button } from "@material-tailwind/react";
import { carousel1, carousel2, carousel3 } from "../../../Assets";
const TourCarousel = () => {
  return (
  <>
  
    <Carousel className="my-6">
      <div className="relative h-full w-full">
        <img
          src={ carousel1 }
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/25">
          <div className="w-3/4 text-center md:w-2/4">
            <div className="w-auto">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Trekking
            </Typography>
            </div>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 "
            >
              Las mejores rutas de trecking con paisajes inolvidables y muchos mas.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="md" color="white">
                Ver
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src={ carousel2 }
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/25">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Gastronomía
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Toda la Gastronomía local con sus recetas unicas y inolvidables.
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src={ carousel3 }
          alt="image 3"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-end bg-black/25">
          <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Mar
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Podras econtrar y disfrutar de todas actividades maritimas en un solo lugar.
            </Typography>
            <div className="flex gap-2">
              <Button size="md" color="white">
                Explore
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  </>
  );
};


export default TourCarousel;


