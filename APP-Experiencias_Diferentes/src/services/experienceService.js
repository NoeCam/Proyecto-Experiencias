const getExperiences = async (search, order, direction) => {
  const queryParams = new URLSearchParams();

  if (search) queryParams.append("search", search);
  if (order) queryParams.append("order", order);
  if (direction) queryParams.append("direction", direction);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/experiencias?${queryParams}`
  );

  const json = await response.json();

  if (!response.ok) throw new Error(json.message || "Failed to request");

  return json.data.experiences;
};

export default getExperiences;
