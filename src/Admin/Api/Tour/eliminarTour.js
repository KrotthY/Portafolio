const URL_API_TOUR_DISABLED = `https://fastapi-gv342xsbja-tl.a.run.app/modificar_estado_tour`;

export const eliminarTour = async (eliminarTurismo) => {

  const queryParams = {
    tour_id: eliminarTurismo.tourId,
    tour_active: eliminarTurismo.estado,
  }
  console.log(queryParams)
  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_TOUR_DISABLED}?${queryString}`;
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${eliminarTurismo.access_token}`,
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
