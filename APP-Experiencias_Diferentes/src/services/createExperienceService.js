const createExperienceService = async ({
    title,
    location,
    description,
    image,
    date,
    price,
    numMinPlaces,
    numTotalPlaces
  }) => {
    // Construir la URL del endpoint de la API
    const url = `${import.meta.env.VITE_API_URL}/experiencias`;

      //! Obtener el token de autenticación desde el almacenamiento local
    const token = localStorage.getItem('token');
  
    // Realizar una solicitud POST para crear una nueva experiencia
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token // Incluir el token en el encabezado Authorization
      },
      body: JSON.stringify({
        title,
        location,
        description,
        image,
        date,
        price,
        numMinPlaces,
        numTotalPlaces
      })
    });
  
    // Convertir la respuesta en formato JSON
    const json = await response.json();
  
    // Si la respuesta no es exitosa, lanzar un error con el mensaje de la respuesta
    if (!response.ok) throw new Error(json.message);
  
    // Devolver la respuesta en formato JSON
    return json;
  };
  
  export default createExperienceService;