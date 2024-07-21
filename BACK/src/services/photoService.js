import fs from "fs";
import path from "path";
import sharp from "sharp";

// Define la ruta de destino para guardar las fotos.
const PHOTO_UPLOAD_DIR = path.join(process.cwd(), "../uploads/photos");

// Asegúrate de que el directorio de fotos exista, si no, créalo.
if (!fs.existsSync(PHOTO_UPLOAD_DIR)) {
  fs.mkdirSync(PHOTO_UPLOAD_DIR, { recursive: true });
}

// Servicio para guardar una foto, redimensionarla y devolver el nombre del archivo.
export const savePhotoService = async (photo, width) => {
  // Genera un nombre único para la foto usando la fecha actual y un número aleatorio.
  const photoName = `${Date.now()}_${Math.floor(Math.random() * 1000)}_${
    photo.name
  }`;

  // Define la ruta completa donde se guardará la foto.
  const photoPath = path.join(PHOTO_UPLOAD_DIR, photoName);

  // Redimensiona la foto a un ancho específico manteniendo la relación de aspecto.
  await sharp(photo.data).resize(width).toFile(photoPath);

  return photoName; // Devuelve el nombre del archivo de la foto.
};
