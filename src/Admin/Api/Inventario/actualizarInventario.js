const URL_API_UPDATE_INVENTARIO = `https://fastapi-gv342xsbja-tl.a.run.app/inventario`;

export const ActualizarInventario = async (actualizarInventario) => {

  const queryParams = {
    inventory_name: actualizarInventario.nombre,
    inventory_value: actualizarInventario.costo,
    inventory_penalty: actualizarInventario.multa,
    inventory_description: actualizarInventario.descripcion,
    department_id:1
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_UPDATE_INVENTARIO}?${queryString}`;
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${actualizarInventario.access_token}`,
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
    throw new Error('API Error: ' + error.message || 'Error al actualizar el inventario');
  }
};
