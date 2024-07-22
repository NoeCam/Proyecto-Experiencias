// Importamos las dependencias.
import bcrypt from 'bcrypt';
import getPool from '../../database/getPool.js';

// Importamos el modelo para seleccionar al usuario por email.
import selectUserByEmailModel from './selectUserByEmailModel.js';

// Función que realiza una consulta a la base de datos para actualizar la contraseña de un usuario.
const changeUserPasswordModel = async (email, oldPassword, newPassword) => {
    const pool = await getPool();

    // Obtenemos al usuario en base al email recibido.
    const user = await selectUserByEmailModel(email);

    // Si no encontramos ningún usuario lanzamos un error.
    if (!user) {
        throw new Error('User not found');
    }

    // Verificamos la contraseña antigua.
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new Error('Old password is incorrect');
    }

    // Encriptamos la nueva contraseña.
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Actualizamos la contraseña del usuario.
    await pool.query(
        `UPDATE users SET password = ?, last_password_change = NOW() WHERE email = ?`, 
        [hashedNewPassword, email]
    );
};

export default changeUserPasswordModel;