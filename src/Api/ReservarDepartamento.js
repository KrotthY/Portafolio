
const URL_API_POST_PURCHASE = `https://fastapi-gv342xsbja-tl.a.run.app/crear_reserva`;

/*
start_date: date Fecha de inicio
end_date: date Fecha de fin
reservation_value: integer Valor de la reserva
reservation_debt: integer Deuda de la reserva
reservation_total: integer Total de la reserva
department_id: integer Id del departamento
client_id: integer Id del cliente
num_hosts: integer Numero de huespedes

*/

export const reservaDepartamento = async (access_token, start_date,end_date,reservation_value,reservation_debt,reservation_total,department_id,num_hosts) => {

  const queryParams = {
    start_date: start_date,
    end_date: end_date,
    reservation_value: reservation_value,
    reservation_debt: reservation_debt,
    reservation_total: reservation_total,
    department_id: department_id,
    num_hosts: num_hosts,
  };

  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${URL_API_POST_PURCHASE}?${queryString}`;
  const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${access_token}`);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
  };


  const response = await fetch(urlWithParams,requestOptions)

  if(!response.ok){
    const errorText = await response.text();
    throw new Error(errorText);
  }
  return response.json();
};
