const URL_API_POST_PURCHASE = `https://fastapi-gv342xsbja-tl.a.run.app/crear_check-in`;

const apiCheckInRegister = async (client_confirmation,reservation_id ,user_id) => {

  const queryParams = {
    client_confirmation: client_confirmation,
    reservation_id: reservation_id,
    user_id: user_id,
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

export  default apiCheckInRegister;
