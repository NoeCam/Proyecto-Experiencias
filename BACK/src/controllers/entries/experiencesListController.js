import getPool from "../../database/getPool.js";
import selectSearchExperiencesService from "../../services/entries/selectSearchExperiencesService.js";

export default async function experiencesListController(req, res, next) {
  try {
    const { search, order, direction } = req.query;

    const userId = req.user?.id;

    let experiences = await selectSearchExperiencesService(
      search,
      order,
      direction,
      userId
    );
    res.send({
      status: "ok",
      data: {
        experiences,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Cambiar estado de activación de la experiencia (activada/desactivada)
export function entryActivationStateController(req, res) {
  const { id } = req.params;
  const { state } = req.body;

  // Validar el estado de activación
  if (!["activated", "deactivated"].includes(state)) {
    return res.status(400).json({ error: "Estado no válido" });
  }

  const query = "UPDATE experiencias SET estado = ? WHERE id = ?";
  const pool = getPool();
  pool.query(query, [state, id], (err, result) => {
    if (err) {
      console.error("Error actualizando la entrada:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Entrada no encontrada" });
    }

    res.status(200).json({
      message: "Activación de la experiencia actualizada exitosamente",
    });
  });
}

// Cambiar el estado de confirmación de la experiencia
export function entryConfirmationStateController(req, res) {
  const { id } = req.params;
  const { state } = req.body;

  // Validar el estado de confirmación
  if (!["confirmed", "unconfirmed"].includes(state)) {
    return res.status(400).json({ error: "Estado no válido" });
  }

  const query = "UPDATE experiencias SET comfirmacion = ? WHERE id = ?";
  const pool = getPool();
  pool.query(query, [state, id], (err, result) => {
    if (err) {
      console.error("Error actualizando la entrada:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Entrada no encontrada" });
    }

    res.status(200).json({
      message: "Activación de la experiencia actualizada exitosamente",
    });
  });
}
