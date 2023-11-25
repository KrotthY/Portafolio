const URL_API_DPTO_DELETE = `https://fastapi-gv342xsbja-tl.a.run.app/eliminar_producto`;

export const eliminarInventario = async (eliminarProductoForm) => {
  const queryParams = {
    inventory_id : eliminarProductoForm.inventory_id,
  }
  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_DPTO_DELETE}?${queryString}`;
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${eliminarProductoForm.access_token}`,
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
    throw new Error('API Error: ' + error.message || 'Error al eliminar el inventario');
  }
};
