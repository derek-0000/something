const url: string = "https://breta-back-end.onrender.com/graphql";
const headers = {
  "content-type": "application/json",
};

export async function getDayApointments(startDate:string, endDate:string) {
  const graphqlQuerry: string = `mutation{
    findByDate(start_date:"${startDate}", end_date:"${endDate}"){
      appointment_id
      start
      end
      status
      is_active
      salon{
        salon_name
        salon_id
      }
      services{
        service_id
      }
    }
  }`;
  console.log(graphqlQuerry)
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query: graphqlQuerry }),
  };
  try {
    const request = await fetch(url, options);
    const result = await request.json();
    console.log(result)
    return result.data.findByDate
  } catch (err) {
    console.log(err);
  }
}

export async function getAllApointments(){
  const graphqlQuerry: string = `{
    appointments{
      appointment_id
      start
      end
      is_active
    }
  }`;
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query: graphqlQuerry }),
  };
  try {
    const request = await fetch(url, options);
    const result = await request.json();
    return result.data.apointments;
  } catch (err) {
    console.log(err);
  }
}

export async function apointmentAccept(appointmentId:number){
  const graphqlQuerry: string = `mutation{
    updateAppointment(
      appointment_id: ${appointmentId},
      updateAppointmentInput: {
        status:"accepted"
      } 
    ){
      appointment_id
      start
      end
      status
      is_active
    }
  }`;
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query: graphqlQuerry }),
  };
  try {
    const request = await fetch(url, options);
    const result = await request.json();
    console.log(result)
    return result.data.updateAppointment
    ;
  } catch (err) {
    console.log(err);
  }
}
export async function apointmentFinish(appointmentId:number){
  const graphqlQuerry: string = `mutation{
    updateAppointment(
      appointment_id: ${appointmentId},
      updateAppointmentInput: {
        status:"accepted"
      } 
    ){
      appointment_id
      start
      end
      status
      is_active
    }
  }`;
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query: graphqlQuerry }),
  };
  try {
    const request = await fetch(url, options);
    const result = await request.json();
    console.log(result)
    return result.data.updateAppointment
    ;
  } catch (err) {
    console.log(err);
  }
}
