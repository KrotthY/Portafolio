const URL_API_CREATE_TOUR = `https://fastapi-gv342xsbja-tl.a.run.app/crear_tour`;

export const CreateNewTour = async (crearTourQuery) => {

  const queryParams = {
    tour_name: crearTourQuery.nombre,
    tour_duration : crearTourQuery.duracion,
    tour_description: crearTourQuery.descripcion,
    tour_value: crearTourQuery.precio,
    tour_capacity: crearTourQuery.capacidad,
    tour_active: crearTourQuery.active,
    tour_comuna_id:1
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_CREATE_TOUR}?${queryString}`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${crearTourQuery.access_token}`,
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
