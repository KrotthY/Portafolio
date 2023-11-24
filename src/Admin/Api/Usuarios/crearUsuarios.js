const URL_API_CREATE_USUARIOS = `https://fastapi-gv342xsbja-tl.a.run.app/crear_servicio`;

export const crearUsuarios = async (crearServicio) => {

  const queryParams = {
    department_id :crearServicio.department_id,
    name: crearServicio.nombre,
    //active_value : crearServicio.active,
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_CREATE_USUARIOS}?${queryString}`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${crearServicio.access_token}`,
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
    throw new Error('API Error: ' + error.message || 'Error al crear el servicio');
  }
};
