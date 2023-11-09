const URL_API_POST_PURCHASE = `https://fastapi-gv342xsbja-tl.a.run.app/solicitar_tour`;

export const purchaseTour = async (access_token, tour_agendado_id) => {
  const queryString = new URLSearchParams({ tour_agendado_id }).toString();
  console.log(queryString)

  const urlWithParams = `${URL_API_POST_PURCHASE}?${queryString}`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${access_token}`,
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
    throw new Error('API Error: ' + error.message || 'Error al reservar tour');
  }
};
