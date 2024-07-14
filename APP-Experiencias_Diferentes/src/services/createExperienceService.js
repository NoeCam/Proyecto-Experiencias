const createExperienceService = async ({
    title,
    description,
    location,
    image,
    date,
    price,
    numMinPlaces,
    numTotalPlaces
  }) => {
    const url = `${import.meta.env.VITE_API_URL}/experiences`;
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        location,
        image,
        date,
        price,
        numMinPlaces,
        numTotalPlaces
      })
    });
  
    const json = await response.json();
  
    if (!response.ok) throw new Error(json.message);
  
    return json;
  };
  
  export default createExperienceService;