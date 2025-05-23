const URL_API_CREATE_INVENTARIO = `https://fastapi-gv342xsbja-tl.a.run.app/crear_servicio`;

export const crearServicios = async (crearServicio) => {

  const queryParams = {
    name: crearServicio.nombre,
    department_id: crearServicio.departamentoId
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_CREATE_INVENTARIO}?${queryString}`;
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
