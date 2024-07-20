const updateExperienceService = async (
  token,
  experienceId,
  {
    title,
    location,
    description,
    image,
    date,
    price,
    numMinPlaces,
    numTotalPlaces,
    confirmedByAdmin
  }) => {
    // Construir la URL del endpoint de la API
    const url = `${import.meta.env.VITE_API_URL}/experiencias/${experienceId}/edit`;

    // Realizar una solicitud PUT para actualizar la experiencia
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({
        title,
        location,
        description,
        image,
        date,
        price,
        numMinPlaces,
        numTotalPlaces,
        confirmedByAdmin
      })
    });
  
    // Convertir la respuesta en formato JSON
    const json = await response.json();
  
    // Si la respuesta no es exitosa, lanzar un error con el mensaje de la respuesta
    if (!response.ok) throw new Error(json.message);
  
    // Devolver la respuesta en formato JSON
    return json;
  };
  
  export default updateExperienceService;