const URL_API_POST_PURCHASE = `https://fastapi-gv342xsbja-tl.a.run.app/agendar_traslado`;

export const agendarTraslado = async (datosDeReserva) => {
  const queryParams = {
    transfer_type: datosDeReserva.tipoDeTraslado,
    total_value : datosDeReserva.totalAPagar,
    reservation_id: datosDeReserva.reservacionId,
    car_id:datosDeReserva.carId,
    driver_id:datosDeReserva.driverId, 
  };

  console.log(queryParams)
  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_POST_PURCHASE}?${queryString}`;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${datosDeReserva.access_token}`,
    },
  };

  try {
    const response = await fetch(urlWithParams, requestOptions);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }
    
    return response.json();
  } catch (error) {
    throw new Error('API Error: ' + error.message || 'Error al reservar traslado');
  }
};
