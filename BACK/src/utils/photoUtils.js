import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

import { UPLOADS_DIR } from "../../env.js";
import { deleteImageError, saveImageError } from "../services/errorService.js";

export const savePhotoUtils = async (img, width) => {
  try {
    const uploadsDir = path.join(process.cwd(), `./${UPLOADS_DIR}`);

    // si no existe la carpeta uploads, la creamos, sino accedemos
    try {
      //intento acceder a la carpeta
      await fs.access(uploadsDir);
    } catch {
      // si no pudo acceder es porque no existe, entonces creala
      await fs.mkdir(uploadsDir);
    }

    // tengo que procesar la imagen porque viene en un buffer
    // creo un objeto de tipo sharp
    const sharpImg = sharp(img.data);

    // configuro el ancho que quiero que tenga la foto
    sharpImg.resize(width);

    // configuro el nombre que va a tener la imagen
    const imgName = `${uuidv4()}.jpg`;

    // configuro el path del lugar donde voy a guardar la imagen
    const pathImg = path.join(uploadsDir, imgName);

    // guardo el archivo en el disco
    await sharpImg.toFile(pathImg);

    return imgName;
  } catch (error) {
    console.error(error);
    saveImageError();
  }
};

export const deletePhotoUtils = async (imgName) => {
  try {
    //especifica la ruta en donde está fuardado el archivo y el nombre del archivo a guardar
    const imgPath = path.join(process.cwd(), `./${UPLOADS_DIR}`, imgName);

    try {
      // intenta acceder a esa imagen
      await fs.access(imgPath);
    } catch {
      //si no hay imagen, simplemente retorna y no borra nada.
      return;
    }

    // si hay imagen lo que hago es borrarlo
    await fs.unlink(imgPath);
  } catch (error) {
    console.error(error);
    deleteImageError();
  }
};

export const duplicatePhotoUtils = async (imgName) => {
  try {
    const uploadsDir = path.join(process.cwd(), `./${UPLOADS_DIR}`);

    // Crea la ruta de la imagen a copiar
    const imagePath = path.join(uploadsDir, imgName);

    // Leer la imagen original desde la ruta proporcionada
    const originalImage = await fs.readFile(imagePath);

    // configuro el nombre que va a tener la imagen
    const newImgName = `${uuidv4()}.jpg`;

    // configuro el path del lugar donde voy a guardar la imagen
    const pathImg = path.join(uploadsDir, newImgName);

    // Guardar el archivo en el disco
    await fs.writeFile(pathImg, originalImage);

    return newImgName;
  } catch (error) {
    console.error(error);
    saveImageError();
  }
};
