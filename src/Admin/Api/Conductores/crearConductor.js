const URL_API_CREATE_CONDUCTOR = `https://fastapi-gv342xsbja-tl.a.run.app/crear_conductor`;

export const CreateNewConductor = async (crearConductorQuery) => {

  const queryParams = {
    driver_full_name: crearConductorQuery.nombre,
    driver_rut: crearConductorQuery.rut,
    driver_phone: crearConductorQuery.numeroTelefono,
    driver_licence_type: crearConductorQuery.tipoLicencia,
    driver_licence_expire_date: crearConductorQuery.fechaVencimientoLicencia,
    driver_startup: crearConductorQuery.fechaIngreso,
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_CREATE_CONDUCTOR}?${queryString}`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${crearConductorQuery.access_token}`,
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
    throw new Error('API Error: ' + error.message || 'Error al crear el conductor');
  }
};
