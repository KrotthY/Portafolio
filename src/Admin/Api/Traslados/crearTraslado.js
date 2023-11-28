const URL_API_CREATE_TRASLADO = `https://fastapi-gv342xsbja-tl.a.run.app/crear_vehiculo`;

export const CreateNewTraslado = async (crearTrasladoQuery) => {

  const queryParams = {
    car_type: crearTrasladoQuery.car_type,
    registration_plate: crearTrasladoQuery.registration_plate,
    slots: crearTrasladoQuery.slots,
    brand: crearTrasladoQuery.brand,
    annio: crearTrasladoQuery.annio,
    model: crearTrasladoQuery.model,
    driver_id: crearTrasladoQuery.driver_id,
    department_id: crearTrasladoQuery.department_id,
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_CREATE_TRASLADO}?${queryString}`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${crearTrasladoQuery.access_token}`,
    },
  };
  try {
    const response = await fetch(urlWithParams, requestOptions);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error('API Error: ' + error.message || 'Error al crear el traslado');
  }
};
