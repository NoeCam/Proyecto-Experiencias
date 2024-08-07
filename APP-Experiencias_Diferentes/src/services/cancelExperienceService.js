const cancelExperienceService = async (token, experienceId, state) => {
  // Construir la URL del endpoint de registro
  const url = `${
    import.meta.env.VITE_API_URL
  }/experiencias/${experienceId}/reservation`;

  // Realizar la solicitud al backend
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(state), // Incluir todos los campos en el cuerpo de la solicitud
  });

  // Parsear la respuesta JSON
  const json = await response.json();

  // Lanzar un error si la respuesta no es exitosa
  if (!response.ok) throw new Error(json.message || "Failed to request");

  // Retornar la respuesta JSON
  return json;
};

export default cancelExperienceService;
