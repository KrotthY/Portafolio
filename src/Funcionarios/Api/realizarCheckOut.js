const URL_API_POST_PURCHASE = `https://fastapi-gv342xsbja-tl.a.run.app/check-out`;

export const realizarCheckOut = async (datosDeReserva) => {
  const queryParams = {
    reservation_id: datosDeReserva.reservation_id,
    usuario_id: datosDeReserva.usuario_id,
    total:datosDeReserva.total,
  };

  console.log(queryParams)

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_POST_PURCHASE}?${queryString}`;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${datosDeReserva.access_token}`,
      'Content-Type': 'application/json',
    },
    
    body: JSON.stringify(datosDeReserva.guestsData),
  };
  console.log(requestOptions);

  try {
    const response = await fetch(urlWithParams, requestOptions);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }
    
    return response.json();
  } catch (error) {
    throw new Error('API Error: ' + error.message || 'Error al realizar el check-out');
  }
};
