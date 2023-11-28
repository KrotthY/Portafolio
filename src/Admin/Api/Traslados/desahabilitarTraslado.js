const URL_API_TRASLADOS_DISABLED = `https://fastapi-gv342xsbja-tl.a.run.app/actualizar_estado_vehiculo`;

export const desahabilitarTraslado = async (trasladosForm) => {

  const queryParams = {
    car_id: trasladosForm.car_id,
    active: trasladosForm.active,
  }
  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_TRASLADOS_DISABLED}?${queryString}`;
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${trasladosForm.access_token}`,
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
    throw new Error('API Error: ' + error.message || 'Error al crear el tour');
  }
};
