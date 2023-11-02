const URL_API_POST_PURCHASE = `https://fastapi-gv342xsbja-tl.a.run.app/agendar_tour`;

export const purchaseTour = async (tour_id,tour_date,start_time,end_time,place,value) => {

  const queryParams = {
    tour_id: tour_id,
    tour_date: tour_date,
    start_time: start_time,
    end_time: end_time,
    place: place,
    value : value,
  };

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_POST_PURCHASE}?${queryString}`;
  const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
  };


  const response = await fetch(urlWithParams,requestOptions)

  if(!response.ok){
    const errorText = await response.text();
    throw new Error(errorText);
  }
  return response.json();
};
