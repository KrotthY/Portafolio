import { TourCarousel, TourOffer } from "../Components";

const Tours = () => {
  return (
    <>
      <div className="w-full h-[600px] mx-auto">
        <TourCarousel />
      </div>
      <div className=" mx-auto px-12 py-12 border-y-4 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          <TourOffer imgSrc="https://cdn.getyourguide.com/img/location/59525c8179704.jpeg/62.jpg" title="Geysers del Tatio" location="Atacama" price={10000} qualification={4.3} status={true} />
          <TourOffer imgSrc="https://cdn.getyourguide.com/img/location/59525c8179704.jpeg/62.jpg" title="New York" location="USA" price={20000} qualification={4.3} status={false}/>
        </div>
      </div>
    </>
  );
}

export default Tours;
