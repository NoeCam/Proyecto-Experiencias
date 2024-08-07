export const changePasswordService = async ({
  newPassword,
  confirmPassword,
}) => {
  const url = `${import.meta.env.VITE_API_URL}/users/change-password`;

  // Recupera el token del almacenamiento local
  const token = localStorage.getItem("token");

  // Asegúrate de que el token esté presente
  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token, // Añade el token al encabezado Authorization
    },
    body: JSON.stringify({ newPassword, confirmPassword }), // Envía ambos campos
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Error details:", errorDetails);
    throw new Error(errorDetails.message || "Failed to change password");
  }

  return await response.json();
};
