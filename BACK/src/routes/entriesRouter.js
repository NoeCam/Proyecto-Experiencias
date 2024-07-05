//*************** Dependencias ********************************/
import express from "express";

//*************** Funciones controladoras intermedias *********/
// import {
//   adminEntryController,
//   experienciaSchema,
// } from "../controllers/entries/adminEntryController.js";
import adminEntryController from "../controllers/entries/adminEntryController.js";
import verifyAdmin from "../middleware/verifyAdminController.js";

//*************** Funciones controladoras finales *************/
import experiencesListController from "../controllers/entries/experiencesListController.js";

import { handleReservationController } from "../controllers/entries/handleReservationController.js";

import getExperienceController from "../controllers/entries/getExperoenceController.js";
import experienceActivationController from "../controllers/entries/experienceActivationController.js";
import experienceConfirmationController from "../controllers/entries/experienceConfirmationController.js";

const router = express.Router();

// Ruta de ejemplo BORRAR
router.get("/entries", (req, res) => {
  res.send("Soy rutas de entrada");
});

// Endpoint para la creación de experiencia de Admin
router.post("/experiencias", adminEntryController);

// Obtención de la lista de experiencias
router.get("/experiencias", experiencesListController);

// Endpoints para para desactivar, reactivar y confirmar la experiencia
router.put(
  "/experiencias/:experienceId/experienceState",
  verifyAdmin,
  experienceActivationController, experienceConfirmationController
);


//Endpoint para reservas y cancelar la reserva de una experiencia
router.put(
  "/experiencias/:experienceId/reservation",
  handleReservationController
);


//Endpoint visualización de una experiencia.
router.get('/experiencias/:experienceId', getExperienceController);

export default router;
