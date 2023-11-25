const URL_API_SERVICE_DISABLED = `https://fastapi-gv342xsbja-tl.a.run.app/actualizar_estado_servicio`;

export const disabledServicios = async (disabledServiciosForm) => {
  const queryParams = {
    servicio_id: disabledServiciosForm.servicioId,
    active : disabledServiciosForm.estado ,
  }
  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_SERVICE_DISABLED}?${queryString}`;
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${disabledServiciosForm.access_token}`,
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
