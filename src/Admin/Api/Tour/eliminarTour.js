const URL_API_TOUR_DELETE = `https://fastapi-gv342xsbja-tl.a.run.app/eliminar_tour`;

export const eliminarTour = async (eliminarTurismo) => {

  const queryParams = {
    name: eliminarTurismo.turismoId,
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_TOUR_DELETE}?${queryString}`;
  const requestOptions = {
    method: 'DELETE',
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
