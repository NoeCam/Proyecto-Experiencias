import getPool from '../../database/getPool.js';

// Función que realiza una consulta a la base de datos para obtener información de una
// experiencia concreta.
const visualizeExperienceModel = async (id) => {
    const pool = await getPool();

    // Obtenemos la información necesaria de la experiencia.
    const [experiences] = await pool.query(
        
                `SELECT 
                    E.id,
                    E.title,
                    E.location, 
                    E.description,
                    E.image,
                    E.date,
                    E.price,
                    E.numMinPlaces,
                    E.numTotalPlaces,
                    E.active
                    FROM experiences E
                    WHERE E.id = ?
                    GROUP BY E.id
                    ORDER BY E.date`
            ,
        [id]
    );

// Obtenemos el array de fotos de la experiencia
// const [image] = await pool.query(
//     `SELECT id, title, image FROM experiences WHERE experienceId = ?`,
//     [id]
// );

// // Agregamos el array con la foto de la experiencia
// experiences[0].image = image;


return experiences;
};

export default visualizeExperienceModel;

 