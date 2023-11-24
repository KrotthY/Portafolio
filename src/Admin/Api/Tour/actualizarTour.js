const URL_API_CREATE_DPTO = `https://fastapi-gv342xsbja-tl.a.run.app/modificar_tour`;

export const ActualizarDpto = async (actualizarTour) => {

  const queryParams = {
    tour_id: actualizarTour.tour_id,
    tour_name: actualizarTour.nombre,
    tour_description: actualizarTour.descripcion,
    tour_capacity: actualizarTour.capacidad,
    tour_duration : actualizarTour.duracion,
    
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_CREATE_DPTO}?${queryString}`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${actualizarTour.access_token}`,
    },
  };

  try {
    const response = await fetch(urlWithParams, requestOptions);
    console.log(response)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error('API Error: ' + error.message || 'Error al crear el departamento');
  }
};
