const URL_API_CREATE_PRODUCTOS = `https://fastapi-gv342xsbja-tl.a.run.app/crear_producto`;

export const crearNuevoProducto = async (crearProductoForm) => {

  const queryParams = {
    inventory_name: crearProductoForm.nombre,
    inventory_description : crearProductoForm.descripcion,
    inventory_value : crearProductoForm.costo,
    inventory_penalty : crearProductoForm.multa,
    department_id :crearProductoForm.departamentoId,
    inventory_quantity: crearProductoForm.cantidad,
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_CREATE_PRODUCTOS}?${queryString}`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${crearProductoForm.access_token}`,
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
    throw new Error('API Error: ' + error.message || 'Error al crear el producto');
  }
};
