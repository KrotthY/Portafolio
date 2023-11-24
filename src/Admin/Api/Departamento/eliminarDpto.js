const URL_API_DPTO_DISABLED = `https://fastapi-gv342xsbja-tl.a.run.app/modificar_estado_departamento`;

export const eliminarDpto = async (eliminarDepartamento) => {
  const queryParams = {
    department_id: eliminarDepartamento.dptoId,
    active:eliminarDepartamento.changeEstado
  }

  const queryString = new URLSearchParams(queryParams).toString();
  console.log(queryString)
  const urlWithParams = `${URL_API_DPTO_DISABLED}?${queryString}`;
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${eliminarDepartamento.access_token}`,
    },
  };

  try {
    const response = await fetch(urlWithParams, requestOptions);
    console.log(response)

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error('API Error: ' + error.message || 'Error al crear el departamento');
  }
};
