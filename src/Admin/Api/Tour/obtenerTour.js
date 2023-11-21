export const obtenerTour = (obtenerTurismo) => {
  const URL_API_TOUR_GET = `https://fastapi-gv342xsbja-tl.a.run.app/tours/${obtenerTurismo.turismoId}`;


  const queryParams = {
    id: obtenerTurismo.turismoId,
  };

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_TOUR_GET}?${queryString}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${obtenerTurismo.access_token}`,
    },
  };

  return fetch(urlWithParams, requestOptions)
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(`API Error (${response.status}): ${text}`);
        });
      }
      return response.json();
    })
    .catch(error => {
      throw new Error('API Error: ' + error.message || 'Error al obtener el tour');
    });
};
