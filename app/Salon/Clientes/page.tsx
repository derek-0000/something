import ClientRow from "@/components/ClientRow"
export default function Clientes() {
  const clients=[
    {
      name:'Alan Paredes',
      gender:'Masculino',
      cellphone:'3494882746',
      email:'alan@smail.com',
      profilePicture:'https://archive.org/download/twitter-default-pfp/e.png'
    },
    {
      name:'Maria Dominguez',
      gender:'Femenino',
      cellphone:'3494222746',
      email:'maria@mail.com',
      profilePicture:'https://i.pinimg.com/550x/47/c4/b0/47c4b09ffed6355a332ea6173343d762.jpg'
    },
    {
      name:'Sabrina Rios',
      gender:'Femenino',
      cellphone:'3492342746',
      email:'sabrina@mail.com',
      profilePicture:'https://archive.org/download/twitter-default-pfp/e.png'
    },
    {
      name:'Gabriela Maldonado',
      gender:'Femenino',
      cellphone:'3494182746',
      email:'gabriela@mail.com',
      profilePicture:'https://archive.org/download/twitter-default-pfp/e.png'
    },
    {
      name:'Elva Madrigal',
      gender:'Femenino',
      cellphone:'44948827463',
      email:'elva@mail.com',
      profilePicture:'https://i.pinimg.com/1200x/e9/d1/6e/e9d16eac29478ff3e265bdaa8a44d266.jpg'
    },

  ]
  return(
    <>
    <div className=" text-2xl font-bold text-breta-blue mb-6">Clientes</div>
    {
      clients.map((client, index)=>{
        return(
          <ClientRow key={index} client={client}/>
        )
      })
    }
    </>
  )
};
