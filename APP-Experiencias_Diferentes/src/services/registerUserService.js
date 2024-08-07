const registerUserService = async ({
  username,
  firstname,
  lastname,
  email,
  password,
}) => {
  // Construir la URL del endpoint de registro
  const url = `${import.meta.env.VITE_API_URL}/users/register`;

  // Realizar la solicitud al backend
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, firstname, lastname, email, password }), // Incluir todos los campos en el cuerpo de la solicitud
  });

  // Parsear la respuesta JSON
  const json = await response.json();

  // Lanzar un error si la respuesta no es exitosa
  if (!response.ok) throw new Error(json.message || "Failed to request");

  // Retornar la respuesta JSON
  return json;
};

export default registerUserService;
