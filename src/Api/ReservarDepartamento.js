const URL_API_POST_PURCHASE = `https://fastapi-gv342xsbja-tl.a.run.app/crear_reserva`;

export const reservaDepartamento = async (datosDeReserva) => {
  const queryParams = {
    start_date: datosDeReserva.start_date,
    end_date: datosDeReserva.end_date,
    reservation_value: datosDeReserva.reservation_value,
    department_id: datosDeReserva.department_id,
    num_hosts: datosDeReserva.num_hosts,
  };


  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_POST_PURCHASE}?${queryString}`;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${datosDeReserva.access_token}`,
      'Content-Type': 'application/json',
    },
    
    body: JSON.stringify(datosDeReserva.guests),
  };

  try {
    const response = await fetch(urlWithParams, requestOptions);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }
    
    return response.json();
  } catch (error) {
    throw new Error('API Error: ' + error.message || 'Error al reservar departamento');
  }
};
