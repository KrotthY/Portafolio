const URL_API_UPDATE_SERVICES = `https://fastapi-gv342xsbja-tl.a.run.app/inventario`;

export const actualizarServicios = async (actualizarServiciosForm) => {

  const queryParams = {
    inventory_name: actualizarServiciosForm.nombre,
    servicioId: actualizarServiciosForm.servicioId,
    department_id:1
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_UPDATE_SERVICES}?${queryString}`;
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${actualizarServiciosForm.access_token}`,
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
    throw new Error('API Error: ' + error.message || 'Error al actualizar el servicio');
  }
};
