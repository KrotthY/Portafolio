const URL_API_CHANGE_USUARIO = `https://fastapi-gv342xsbja-tl.a.run.app/actualizar_estado_usuario`;

export const cambiarEstadoUsuario = async (cambiarEstadoUsuarioForm) => {
  const queryParams = {
    username_id: cambiarEstadoUsuarioForm.username_id ,
    active: cambiarEstadoUsuarioForm.active  ,
  }
  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_CHANGE_USUARIO}?${queryString}`;
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${cambiarEstadoUsuarioForm.access_token}`,
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
    throw new Error('API Error: ' + error.message || 'Error al desahabilitar el usuario');
  }
};
