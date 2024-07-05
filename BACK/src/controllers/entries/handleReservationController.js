import getPool from "../../database/getPool.js";

const handleReservationController = async (req, res, next) => {
    const id = req.params.experienceId;
    const { state } = req.body;

    // Validar el estado de la reserva (con un booleano)
    if (typeof state !== 'boolean') {
        return res.status(400).json({ error: 'Estado de la reserva no válido. Debe ser true o false.' });
    }

    const query = 'UPDATE reservations SET state = ? WHERE id = ?';
    const pool = await getPool();

    try{

        await pool.query(query, [state, id]);

        res.send({
            status: 'ok',
            message: 'Reserva modificada',
        });        

    }catch(err){
        next(err);
    }

};

export default handleReservationController;