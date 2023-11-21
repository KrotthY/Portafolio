const URL_API_CREATE_INVENTARIO = `https://fastapi-gv342xsbja-tl.a.run.app/crear_inventario`;

export const crearNuevoInventario = async (crearInventario) => {

  const queryParams = {
    department_id :1,
    inventory_name: crearInventario.nombre,
    inventory_value : crearInventario.costo,
    inventory_penalty : crearInventario.multa,
    inventory_description : crearInventario.descripcion
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_CREATE_INVENTARIO}?${queryString}`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${crearInventario.access_token}`,
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
    throw new Error('API Error: ' + error.message || 'Error al crear el inventario');
  }
};
