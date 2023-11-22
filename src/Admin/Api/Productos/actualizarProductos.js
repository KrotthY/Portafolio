
export const ActualizarProducto = async (actualizarProductosForm) => {
  const URL_API_UPDATE_PRODUCTOS = `https://fastapi-gv342xsbja-tl.a.run.app/productos/${actualizarProductosForm.productosId}`;
  
  const queryParams = {
    id: actualizarProductosForm.productosId,
    inventory_name: actualizarProductosForm.nombre,
    inventory_description: actualizarProductosForm.descripcion,
    inventory_value: actualizarProductosForm.costo,
    inventory_penalty: actualizarProductosForm.multa,
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_UPDATE_PRODUCTOS}?${queryString}`;
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${actualizarProductosForm.access_token}`,
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
    throw new Error('API Error: ' + error.message || 'Error al actualizar el productos');
  }
};
