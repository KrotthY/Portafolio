const URL_API_CREATE_MAINTENCE = `https://fastapi-gv342xsbja-tl.a.run.app/actualizar_departamento`;

export const CrearMatencion = async (asignarMantencion) => {

  const queryParams = {
      tipoMantencion: asignarMantencion.tipoMantencion,
      encargado: asignarMantencion.encargado,
      startDate: asignarMantencion.startDate,
      endDate: asignarMantencion.endDate
    }
  

  const queryString = new URLSearchParams(queryParams).toString();
  console.log(queryString)
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
