const URL_API_SERVICE_DELETE = `https://fastapi-gv342xsbja-tl.a.run.app/eliminar_servicio`;

export const eliminarServicios = async (eliminarServiciosForm) => {
  const queryParams = {
    service_id : eliminarServiciosForm.servicioId,
  }
  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_SERVICE_DELETE}?${queryString}`;
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${eliminarServiciosForm.access_token}`,
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
    throw new Error('API Error: ' + error.message || 'Error al eliminar el servicio');
  }
};
