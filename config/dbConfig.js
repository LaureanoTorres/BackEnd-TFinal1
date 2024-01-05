const mysql = require('mysql')
const fs = require('fs')
const util = require('util')


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_MYSQL_DATABASE
})
let counter = Number(fs.readFileSync('./static/dbErrorsCounter.txt', 'utf-8'))

db.connect((error)=>{

    if(error){
        fs.promises.writeFile('./logs/errors/db/error-' + counter++ + '.txt', JSON.stringify(error), 'utf-8')
        fs.promises.writeFile('./static/dbErrorsCounter.txt', String(counter), 'utf-8')
        console.error('Error al conectar a MySql')
    }

    else{
        console.log('Conectado con exito a la Base de datos')
    }

})

const createProduct = ({nombre, price, stock, descripcion}) =>{
    const query = 'INSERT INTO productos (nombre, price, stock, descripcion) VALUES (?,?,?,?)'
    db.query(query,[nombre, price, stock, descripcion], (error, result) =>{
        if(error){
            console.error(error)
        }
        else{
            console.log('El producto se creó exitosamente')
        }
    })
}   



/* createProduct({nombre: 'Mouse logitech', price: 20, stock: 43, descripcion: 'Mouse inhalambrico'}) */


const dbQueryAsync = util.promisify(db.query).bind(db) //queryAsync nos permite interactuar con mysql de manera asincronica

module.exports = dbQueryAsync