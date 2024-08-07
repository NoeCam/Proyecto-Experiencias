const validateUserService = async ({ registrationCode }) => {
  // Construir la URL del endpoint de registro
  const url = `${
    import.meta.env.VITE_API_URL
  }/users/validate/${registrationCode}`;

  // Realizar la solicitud al backend
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ registrationCode }),
  });
  const json = await response.json();

  if (!response.ok) throw new Error(json.message || "Failed to request");

  return json;
};

export default validateUserService;
