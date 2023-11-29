const URL_API_POST_PURCHASE = `https://fastapi-gv342xsbja-tl.a.run.app/check-out-extra`;

export const realizarCheckOutCorrecto = async (datosDeReserva) => {
  const queryParams = {
    reservation_id: datosDeReserva.reservation_id,
    usuario_id: datosDeReserva.usuario_id,
  };

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_POST_PURCHASE}?${queryString}`;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${datosDeReserva.access_token}`,
    }
  };


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
