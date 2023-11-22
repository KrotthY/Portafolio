const URL_API_UPDATE_DPTO = `https://fastapi-gv342xsbja-tl.a.run.app/departamentos`;

export const ActualizarDpto = async (actualizarDepartamento) => {

  const queryParams = {
    department_id : actualizarDepartamento.deptoId,
    name: actualizarDepartamento.nombre,
    description: actualizarDepartamento.descripcion,
    baths: actualizarDepartamento.banos,
    rooms: actualizarDepartamento.habitaciones,
    beds: actualizarDepartamento.camas,
    daily_rate: actualizarDepartamento.tarifa,
    active: actualizarDepartamento.active,
    num_host: actualizarDepartamento.huespedes,
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_UPDATE_DPTO}?${queryString}`;
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${actualizarDepartamento.access_token}`,
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
    throw new Error('API Error: ' + error.message || 'Error al actualizar el departamento');
  }
};
