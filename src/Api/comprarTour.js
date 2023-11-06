const URL_API_POST_PURCHASE = `https://fastapi-gv342xsbja-tl.a.run.app/solicitar_tour`;

export const purchaseTour = async (access_token,tour_agendado_id) => {
  const queryParams = {
    tour_agendado_id: tour_agendado_id,
  };

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_POST_PURCHASE}?${queryString}`;
  const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${access_token}`);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
  };


  const response = await fetch(urlWithParams,requestOptions)
  if(!response.ok){
    const errorText = await response.text();
    throw new Error(errorText);
  }
  console.log()
  return response.json();
};
