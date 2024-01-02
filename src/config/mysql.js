import mysql from "mysql2/promise"

const mysqlConfig = { 
    host: 'localhost',
    user: 'root',
    password: 'example',
    database: 'eduzz_teste',
    port: '3306'
}

export const connection = await mysql.createConnection(mysqlConfig);

