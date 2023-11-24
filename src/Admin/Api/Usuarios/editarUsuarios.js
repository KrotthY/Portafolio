const URL_API_EDIT_USUARIOS = `https://fastapi-gv342xsbja-tl.a.run.app/usuarios`;

export const EditarUsuarios = async (actualizarUsuariosForm) => {

  const queryParams = {
    inventory_name: actualizarUsuariosForm.nombre,
    servicioId: actualizarUsuariosForm.servicioId,
    department_id:1
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_EDIT_USUARIOS}?${queryString}`;
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${actualizarUsuariosForm.access_token}`,
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
    throw new Error('API Error: ' + error.message || 'Error al actualizar el servicio');
  }
};
