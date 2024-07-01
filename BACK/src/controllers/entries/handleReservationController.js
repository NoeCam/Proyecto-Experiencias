import getPool from "../../database/getPool.js";

export function handleReservationController(req, res) {
    const { id } = req.params;
    const { state } = req.body;

    // Validar el estado de la reserva (con un booleano)
    if (typeof state !== 'boolean') {
        return res.status(400).json({ error: 'Estado de la reserva no válido. Debe ser true o false.' });
    }

    const query = 'UPDATE reservations SET userId = ? WHERE id = ?';
    const pool = getPool();
    pool.query(query, [state, id], (err, result) => {
        if (err) {
            console.error('Error actualizando la reserva:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Entrada no encontrada' });
        }

        res.status(200).json({ message: `Experiencia ${state ? 'reservada' : 'cancelada'} exitosamente` });
    });
};
