const URL_API_CREATE_DPTO = `https://fastapi-gv342xsbja-tl.a.run.app/crear_departamento`;

export const CreateNewDpto = async (crearDepartamento) => {

  const queryParams = {
    name: crearDepartamento.nombre,
    description: crearDepartamento.descripcion,
    baths: crearDepartamento.banos,
    rooms: crearDepartamento.habitaciones,
    beds: crearDepartamento.camas,
    dept_type: crearDepartamento.tipo,
    daily_rate: crearDepartamento.tarifa,
    address: crearDepartamento.direccion,
    address_number: crearDepartamento.numeroDireccion,
    active: 'S',
    commune_id: crearDepartamento.comuna,
    num_host: crearDepartamento.huespedes,
  }
  //region: formData.region,
  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_CREATE_DPTO}?${queryString}`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${crearDepartamento.access_token}`,
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
    throw new Error('API Error: ' + error.message || 'Error al crear el departamento');
  }
};

