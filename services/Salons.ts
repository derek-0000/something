import SalonCustomization, { SalonData } from "@/components/SalonCustomization";
const url: string = "https://breta-back-end.onrender.com/graphql";
const headers = {
  "content-type": "application/json",
};

export async function getSalonById(id: string|undefined) {
  const graphqlQuerry: string = `{
      salon(salon_id: ${id}){
        salon_id
        salon_name
        email
        cellphone
        main_picture
        wallpaper
        description
        schedule
        image_gallery
        address{
          address_id
          country
          city
          street
          postal_code
          interior_number
          exterior_number
        }
        ratings{
          score
        }
        services {
          service_name
          description
          timespan
        }
    }
    }
    `;
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query: graphqlQuerry }),
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.data.salon;
  } catch (err) {
    console.log(err);
  }
}

export async function getEmployees(id: string) {
  const graphqlQuerry: string = `{
      salon(salon_id: ${id}){
        employee{
          employee_id
          profile_picture
          employee_name
          cellphone
          email
          commission
          paymentCycle
          payday
          role {
            role_name
          }
        }
        roles {
          role_name
        }
    }
    }
    `;
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query: graphqlQuerry }),
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result)
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function getRatingById(id: string) {
  const graphqlQuerry: string = `{
      salon(salon_id: ${id}){
        salon_id
        salon_name
        ratings{
          score
          comment
        }
    }
    }
    `;
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query: graphqlQuerry }),
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result)
    return result.data.salon;
  } catch (err) {
    console.log(err);
  }
}

export async function UpdateSalon(salonDetails: SalonData, id:number|undefined) {
  const graphqlQuerry: string = `
  mutation{
    updateSalon(
      salon_id: ${id}
      updateSalonInput: {
        salon_name: "${salonDetails.salon_name}"
        email: "${salonDetails.email}"
        cellphone: "${salonDetails.cellphone}"
        main_picture: "${salonDetails.main_picture}"
        wallpaper: "${salonDetails.wallpaper}"
        image_gallery: ["${salonDetails.image_gallery != null ? salonDetails.image_gallery[0] :""}",
        "${salonDetails.image_gallery[1]? salonDetails.image_gallery[1] :""}",
        "${salonDetails.image_gallery[2]? salonDetails.image_gallery[2] :""}",
        "${salonDetails.image_gallery[3]? salonDetails.image_gallery[3] :""}",
        "${salonDetails.image_gallery[4]? salonDetails.image_gallery[4] :""}",
        "${salonDetails.image_gallery[5]? salonDetails.image_gallery[5] :""}",
        "${salonDetails.image_gallery[6]? salonDetails.image_gallery[6] :""}",
        "${salonDetails.image_gallery[7]? salonDetails.image_gallery[7] :""}",
        "${salonDetails.image_gallery[8]? salonDetails.image_gallery[8] :""}",]
        schedule:[
          { day: "${salonDetails.schedule[0].day}", open: ${salonDetails.schedule[0].open}, from: "${salonDetails.schedule[0].from}", to: "${salonDetails.schedule[0].to}" },
          { day: "${salonDetails.schedule[1].day}", open: ${salonDetails.schedule[1].open}, from: "${salonDetails.schedule[1].from}", to: "${salonDetails.schedule[1].to}" },
          { day: "${salonDetails.schedule[2].day}", open: ${salonDetails.schedule[2].open}, from: "${salonDetails.schedule[2].from}", to: "${salonDetails.schedule[2].to}" },
          { day: "${salonDetails.schedule[3].day}", open: ${salonDetails.schedule[3].open}, from: "${salonDetails.schedule[3].from}", to: "${salonDetails.schedule[3].to}" },
          { day: "${salonDetails.schedule[4].day}", open: ${salonDetails.schedule[4].open}, from: "${salonDetails.schedule[4].from}", to: "${salonDetails.schedule[4].to}" },
          { day: "${salonDetails.schedule[5].day}", open: ${salonDetails.schedule[5].open}, from: "${salonDetails.schedule[5].from}", to: "${salonDetails.schedule[5].to}" },
          { day: "${salonDetails.schedule[6].day}", open: ${salonDetails.schedule[6].open}, from: "${salonDetails.schedule[6].from}", to: "${salonDetails.schedule[6].to}" },
        ]
      }
    ){
      salon_id
      salon_name
      schedule
    }
  }
`;
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query: graphqlQuerry }),
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err)
    return err;
  }
}
export async function updateSalonAddress(salonDetails:SalonData){
  const graphqlQuerry:string = `
    mutation{
      updateAddress(
        address_id: ${salonDetails.address.address_id}
        updateAddressInput: {
          country: "${salonDetails.address.country}"
          city: "${salonDetails.address.city}"
          street: "${salonDetails.address.street}"
          postal_code: ${salonDetails.address.postal_code}
          interior_number: ${salonDetails.address.interior_number}
          exterior_number: ${salonDetails.address.exterior_number}
        }
      ){
        country
        city
        street
        postal_code
      }
    }
  `
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query: graphqlQuerry }),
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result)
    return result;
  } catch (err) {
    console.log(err)
    return err;
  }
}

export async function getSalons() {
  const graphqlQuerry = `{
    salons{
      salon_id
      salon_name
      email
      cellphone
      main_picture
      wallpaper
      description
      schedule
      ratings{
        score
      }
      address{
        country
        city
        street
        postal_code
        interior_number
        exterior_number
      }
    }
  }`;
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query: graphqlQuerry }),
  };
  try{
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data)
    const result = data.data;
    return result
  }catch(err){
    console.log(err)
  }
};

export async function getAddress(id: string) {
  const graphqlQuerry: string = `{
      salon(salon_id: ${id}){
        salon_id
        salon_name
        address{
          city
          street
          exterior_number
          postal_code
        }
    }
    }
    `;
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query: graphqlQuerry }),
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function getServices(id: string) {
  const graphqlQuerry: string = `{
      salon(salon_id: ${id}){
        salon_id
        main_picture
        services{
          service_name
          category
          timespan
          price
        }
        employee {
          profile_picture
        }
    }
    }
    `;
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query: graphqlQuerry }),
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.data.salon.services;
  } catch (err) {
    console.log(err);
  }
}
