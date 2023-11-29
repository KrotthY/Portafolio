const URL_API_CREATE_USUARIOS = `https://fastapi-gv342xsbja-tl.a.run.app/crear_administrativo`;

export const crearNuevoUsuario = async (crearUsuario) => {

  const queryParams = {
    user_type : crearUsuario.tipoStaffId,
    name : crearUsuario.nombre,
    last_name : crearUsuario.apellido,
    username : crearUsuario.usuario,
    rut: crearUsuario.rut,
    email: crearUsuario.correo,
    phone: crearUsuario.telefono,
    password : crearUsuario.contrasena,
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_CREATE_USUARIOS}?${queryString}`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${crearUsuario.access_token}`,
      'Content-Type': 'application/json',
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
    throw new Error('API Error: ' + error.message || 'Error al crear el servicio');
  }
};
