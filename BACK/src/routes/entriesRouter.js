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

import visualizeExperienceModel from "../models/entries/visualizeExperienceModel.js";

const router = express.Router();

// Ruta de ejemplo BORRAR
router.get("/entries", (req, res) => {
  res.send("Soy rutas de entrada");
});

// Endpoint para la creación de experiencia de Admin
// router.post("/experiencias", adminEntryController, (req, res) => {
//   const { error } = experienciaSchema.validate(req.body);
//   return error;
// });
router.post("/experiencias", adminEntryController);

// Obtención de la lista de experiencias
router.get("/experiencias", experiencesListController);

// Endpoints para para desactivar, activar y confirmar la experiencia
//? Desactivar
router.put(
  "/experiencias/:experienceId/deactivate",
  verifyAdmin,
  experiencesListController
);
//? Activar
router.put(
  "/experiencias/:experienceId/activate",
  verifyAdmin,
  experiencesListController
);
//? Confirmar
router.put(
  "/experiencias/:experienceId/confirmExperience",
  verifyAdmin,
  experiencesListController
);

//Endpoint para reservas y cancelar la reserva de una experiencia
router.put(
  "/experiencias/:experienceId/reservation",
  handleReservationController
);


//Endpoint visualización de una experiencia.
router.get('/experiencias/:experienceId', visualizeExperienceModel);

export default router;
