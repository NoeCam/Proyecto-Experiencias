import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();
const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD
} = process.env;

let pool;
const getPool = async () => {
    try {
        
        if(!pool){
            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
                timezone: 'Z'
            });
        }

        return await pool;
    } catch (error) {
        console.log(error);
    }
}

export default getPool;