const URL_API_CREATE_AGENDA = `https://fastapi-gv342xsbja-tl.a.run.app/agendar_tour`;

export const CreateNewAgendaTour = async (crearTourQuery) => {

  const horaInicioInt = convertTimeToInteger(crearTourQuery.horaInicio);
  const horaTerminoInt = convertTimeToInteger(crearTourQuery.horaTermino);

  const queryParams = {
    tour_id: crearTourQuery.tour_id,
    tour_date: crearTourQuery.fecha,
    start_time: horaInicioInt, 
    end_time: horaTerminoInt, 
    place: crearTourQuery.lugar ,
    value: crearTourQuery.precio ,

  }
  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_CREATE_AGENDA}?${queryString}`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${crearTourQuery.access_token}`,
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
    throw new Error('API Error: ' + error.message || 'Error al agendar un tour');
  }
};



function convertTimeToInteger(timeString) {
  const matches = timeString.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
  if (!matches) {
    return null; // o lanzar un error
  }
  let [_, hour, minute, period] = matches;
  hour = parseInt(hour, 10);
  minute = parseInt(minute, 10);
  if (period.toUpperCase() === "PM" && hour !== 12) {
    hour += 12;
  }
  if (period.toUpperCase() === "AM" && hour === 12) {
    hour = 0;
  }
  return hour * 100 + minute;
}


