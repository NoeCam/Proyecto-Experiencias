const updateExperienceService = async (token, experienceId, data) => {
  // Construir la URL del endpoint de la API
  const url = `${
    import.meta.env.VITE_API_URL
  }/experiencias/${experienceId}/edit`;

  // Realizar una solicitud PUT para actualizar la experiencia
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: token,
    },
    body: data,
  });

  // Convertir la respuesta en formato JSON
  const json = await response.json();

  // Si la respuesta no es exitosa, lanzar un error con el mensaje de la respuesta
  if (!response.ok) throw new Error(json.message || "Failed to request");

  // Devolver la respuesta en formato JSON
  return json;
};

export default updateExperienceService;
