const url: string = "https://breta-back-end.onrender.com/graphql";
const headers = {
  "content-type": "application/json",
};

export async function CreateSalon(user_id:string, email:string, cellphone:string){
  const graphqlQuerry: string = `mutation{
    createSalon(
      user_id: "${user_id}"
      createSalonInput: {
        salon_name: "¡Agrega un nombre!"
        email: "${email}"
        cellphone: "${cellphone}"
        description: "¡Agrega una descripción!"
        schedule:[
          { day: "lunes", open: false, from: "", to: "" },
          { day: "martes", open: false, from: "", to: "" },
          { day: "miercoles", open: false, from: "", to: "" },
          { day: "jueves", open: false, from: "", to: "" },
          { day: "viernes", open: false, from: "", to: "" },
          { day: "sabado", open: false, from: "", to: "" },
          { day: "domingo", open: false, from: "", to: "" },
        ] 
        image_gallery:["https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",  "",  "",  "",  "",  "",  "",  "",  ""]
      }
      ){
        salon_id
        salon_name
        schedule
        email
      }
    }`;

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ query: graphqlQuerry }),
    };
    try{
      const response = await fetch(url,options);
      const result = await response.json()
      const createAddressQuerry:string = `
        mutation{
        createAddress(
          salon_id: ${result.data.createSalon.salon_id}
          createAddressInput: {
            country: "Agrega tu Pais"
            city: "Agrega tu ciudad"
            street: "Agrega tu calle"
            postal_code: 0
            exterior_number: 0
            interior_number: 0
          }
        ){
        	address_id
          country
          city
          street
          postal_code
        }
      }
      `
      const addressOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ query: createAddressQuerry }),
      };
      const addressResponse = await fetch(url,addressOptions);
      const addressResult = await addressResponse.json();
      return result
    }catch(err){
      console.log(err)
    }

}
