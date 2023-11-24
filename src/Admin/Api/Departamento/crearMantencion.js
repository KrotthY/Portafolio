const URL_API_CREATE_MAINTENCE = `https://fastapi-gv342xsbja-tl.a.run.app/crear_mantenimiento`;

export const CrearMatencion = async (asignarMantencion) => {

  const queryParams = {
      maintenance_description: asignarMantencion.descripcion,
      maintenance_extra_coments: asignarMantencion.tipoMantencion,
      maintenance_manager: asignarMantencion.encargado,
      department_id: asignarMantencion.department_id,
      reservation_start_date : asignarMantencion.startDate,
      reservation_end_date : asignarMantencion.endDate
    }
  

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_CREATE_MAINTENCE}?${queryString}`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${asignarMantencion.access_token}`,
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
    throw new Error('API Error: ' + error.message || 'Error al asignar mantencion');
  }
};
