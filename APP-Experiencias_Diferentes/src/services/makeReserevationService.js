const makeReservationService = async (token, experienceId, data) => {
  const { VITE_API_URL } = import.meta.env;

  const url = `${VITE_API_URL}/experiencias/${experienceId}/reservation`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || "Failed to request");
  }

  return json;
};

export default makeReservationService;
