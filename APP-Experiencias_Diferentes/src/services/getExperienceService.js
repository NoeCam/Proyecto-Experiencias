const getExperienceService = async (experienceId, token) => {
  // Construir la URL del endpoint de la AP
  const url = `${import.meta.env.VITE_API_URL}/experiencias/${experienceId}`;

  // Realizar una solicitud GET para obtener los detalles de la experiencia
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  // Convertir la respuesta en formato JSON
  const json = await response.json();

  // Si la respuesta no es exitosa, lanzar un error con el mensaje de la respuesta
  if (!response.ok) throw new Error(json.message || "Failed to request");

  // Devolver la respuesta en formato JSON
  return json.data.experience;
};

export default getExperienceService;
