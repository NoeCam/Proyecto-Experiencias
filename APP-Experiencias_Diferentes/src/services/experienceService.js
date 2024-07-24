//Servicio que llama al endpoint del back para obtener las experiencias con filtros y ordenaciones

const getExperiences = async (search, order, direction) => {
  const queryParams = new URLSearchParams();

  if (search) queryParams.append("search", search);
  if (order) queryParams.append("order", order);
  if (direction) queryParams.append("direction", direction);

  //Equivalente a lineas 4, 5 y 6?
  // const getExperiences = async (search, order, direction) => {
  //     const queryParams = new URLSearchParams({
  //       search,
  //       order,
  //       direction,
  //     });

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/experiencias?${queryParams}`
  );
  const data = await response.json();

  if (response.ok) {
    return data.data.experiences;
  } else {
    throw new Error(data.message);
  }
};

export default getExperiences;
