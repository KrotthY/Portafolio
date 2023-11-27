const URL_API_UPDATE_DPTO = `https://fastapi-gv342xsbja-tl.a.run.app/modificar_conductor`;

export const ActualizarConductor = async (ActualizarConductorQuery) => {

  const fechaExpire = formatearFecha(ActualizarConductorQuery.fechaVencimientoLicencia);
  const fechaStartup = formatearFecha(ActualizarConductorQuery.fechaIngreso);

  const queryParams = {
    driver_id : ActualizarConductorQuery.conductorId,
    driver_full_name : ActualizarConductorQuery.nombre,
    driver_rut : ActualizarConductorQuery.rut,
    driver_phone : ActualizarConductorQuery.numeroTelefono,
    driver_licence_type : ActualizarConductorQuery.tipoLicencia,
    driver_licence_expire_date : fechaExpire,
    driver_startup : fechaStartup,
  }
  console.log(queryParams);
  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_UPDATE_DPTO}?${queryString}`;
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${ActualizarConductorQuery.access_token}`,
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
    throw new Error('API Error: ' + error.message || 'Error al actualizar el departamento');
  }
};


function formatearFecha(fecha) {
  const d = new Date(fecha);

  const dia = d.getDate();
  const mes = d.getMonth() + 1; 
  const año = d.getFullYear();

  const diaFormateado = dia < 10 ? `0${dia}` : dia;
  const mesFormateado = mes < 10 ? `0${mes}` : mes;

  return `${año}-${mesFormateado}-${diaFormateado}`;
}