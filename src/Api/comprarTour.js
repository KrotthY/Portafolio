const URL_API_POST_PURCHASE = `https://fastapi-gv342xsbja-tl.a.run.app/solicitar_tour`;

export const purchaseTour = async (formTours) => {
  const queryParams = {
    schedule_tour_id : formTours.TOUR_ID,
    participants: formTours.CANTIDAD,
    total_value: formTours.VALOR_TOTAL
  }


  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_POST_PURCHASE}?${queryString}`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${formTours.access_token}`,
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
