const URL_API_AGENDA_DELETE = `https://fastapi-gv342xsbja-tl.a.run.app/eliminar_agenda_tour`;

export const eliminarAgendaTour = async (eliminarAgenda) => {

  const queryParams = {
    schedule_tour_id: eliminarAgenda.idReservaAgenda,
  }
  console.log(queryParams)
  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_AGENDA_DELETE}?${queryString}`;
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${eliminarAgenda.access_token}`,
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
    throw new Error('API Error: ' + error.message || 'Error al eliminar la agenda');
  }
};
