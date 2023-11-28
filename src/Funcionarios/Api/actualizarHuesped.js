const URL_API_UPDATE_ACOMPANANTE = `https://fastapi-gv342xsbja-tl.a.run.app/update_acompanante`;

export const ActualizarAcompanante = async (ActualizarHuespédQuery) => {

  const queryParams = {
    acompanante_id  : ActualizarHuespédQuery.idAcompanante,

  }
  console.log(queryParams);
  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_UPDATE_ACOMPANANTE}?${queryString}`;
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${ActualizarHuespédQuery.access_token}`,
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
    throw new Error('API Error: ' + error.message || 'Error al actualizar el huesped');
  }
};