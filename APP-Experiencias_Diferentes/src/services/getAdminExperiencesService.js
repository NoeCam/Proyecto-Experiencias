const getAdminExperienceService = async (token) => {
  const url = `${import.meta.env.VITE_API_URL}/admin/experiences`;

  const response = await fetch(url, {
    method: "GET", // Asegúrate de especificar el método HTTP
    headers: {
      "Content-Type": "application/json", // Especifica el tipo de contenido
      Authorization: token,
    },
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || "Failed to request"); // Proporciona un mensaje de error si la solicitud falla
  }

  return json.data.experiences; // Asegúrate de que la estructura de datos sea la correcta
};

export default getAdminExperienceService;
