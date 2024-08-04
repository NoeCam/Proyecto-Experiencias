export const changePasswordService = async ({ newPassword }) => {
  // Usamos import.meta.env para acceder a la variable de entorno en Vite
  const url = `${import.meta.env.VITE_API_URL}/users/change-password`;
  // Hacemos la solicitud al endpoint de cambio de contraseña
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newPassword }),
  });

  // Si la respuesta no es exitosa, lanzamos un error
  if (!response.ok) {
    throw new Error("Failed to change password");
  }

  // Devolvemos la respuesta en formato JSON
  return await response.json();
};
