import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import getAdminExperiencesService from "../services/getAdminExperiencesService";
import { ToastContainer, toast } from "react-toastify";
import ExperienceFilter from "./ExperienceFilter";


const AdminExperiencesList = () => {
  const { token } = useContext(AuthContext);
  const [experiences, setExperiences] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const { VITE_API_URL } = import.meta.env;
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  const [direction, setDirection] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const experiencesData = await getAdminExperiencesService(token);
        setExperiences(experiencesData);
        console.log(experiencesData);
        setFilteredExperiences(experiencesData); // Inicialmente, todos los datos están sin filtrar
      } catch (error) {
        toast.error("Error fetching experiences");
      }
    };

    fetchExperiences();
  }, [token]);

  useEffect(() => {
    let filteredData = [...experiences];

    // Filtro de búsqueda
    if (search) {
      filteredData = filteredData.filter((experience) =>
        experience.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Ordenación
    if (order) {
      filteredData.sort((a, b) => {
        let aValue = a[order];
        let bValue = b[order];

        if (order === "date") {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (direction === "ASC") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    setFilteredExperiences(filteredData);
  }, [search, order, direction, experiences]);

  return (
    <>
      <ExperienceFilter
        setSearch={setSearch}
        setOrder={setOrder}
        setDirection={setDirection}
      />

      <h1 className="flex font-titleLicorice text-5xl font-black justify-center text-white tracking-wider mt-5">
        E<span className="text-yellow-500">x</span>periencias
      </h1>
      <h2 className="flex font-titleLicorice text-5xl font-black justify-center text-white tracking-wider mb-3">
        {" "}
        <span className="text-cyan-500">D</span>iferentes
      </h2>
      <h3 className="h3">Reserved Experiences</h3>

      <div className="md:grid md:grid-cols-2 xl:grid-cols-3 bg-white bg-opacity-50 mb-10 mx-2 p-2 rounded-3xl">
        {filteredExperiences.map((experience, index) => (
          <div
            key={index}
            className="flex grid-row md:grid-cols-4 bg-cyan-500 bg-opacity-50 m-2 p-5 rounded-3xl"
          >
            <div className="w-1/2">
              {" "}
              <img
                className="rounded-3xl h-full object-cover"
                src={
                  experience.image
                    ? `${VITE_API_URL}/uploads/${experience.image}`
                    : "The experience does not contain images"
                }
                alt={experience.title}
              />
            </div>

            <div className="ml-5 w-1/2">
              <h2 className="font-bold">{experience.title}</h2>
              <p className="font-bold">Ubicación:</p> {experience.location}
              <p className="font-bold">Fecha: </p>
              {new Date(experience.date).toLocaleDateString()}
              <p className="font-bold">Precio: €</p>
              {experience.price}
              
              <p className="font-bold">Reserves:</p>{experience.quantityPerPerson}
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </>
  );
};

export default AdminExperiencesList;
