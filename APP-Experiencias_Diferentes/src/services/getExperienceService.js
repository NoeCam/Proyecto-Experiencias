const getExperienceService = async (experienceId) => {
    // Construir la URL del endpoint de la AP
    const url = `${import.meta.env.VITE_API_URL}/experiences/${experienceId}`;
  
    // Realizar una solicitud GET para obtener los detalles de la experiencia
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    // Convertir la respuesta en formato JSON
    const json = await response.json();
  
    // Si la respuesta no es exitosa, lanzar un error con el mensaje de la respuesta
    if (!response.ok) throw new Error(json.message);
  
    // Devolver la respuesta en formato JSON
    return json;
  };
  
  export default getExperienceService;