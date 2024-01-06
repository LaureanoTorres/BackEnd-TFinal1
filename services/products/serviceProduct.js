const {pool}= require('../../config/dbConfig')
const mailerService = require('./mailerService/mailerService')
const { productCreatedTemplate } = require('./mailerService/templates/productMailTemplate')


const createProduct = async ({nombre, price, stock, descripcion}) =>{
    try{
        const query = 'INSERT INTO productos (nombre, precio, stock, descripcion) VALUES (?,?,?,?)'
        const result = await pool.promise().query(query, [nombre, price, stock, descripcion])
        mailerService.transport.sendMail(
            productCreatedTemplate('', 'admin', {nombre, price, stock, descripcion}), (error) =>{
            if (error){
                console.error('no se pudo enviar el mail')
            } else{
                console.log('el mail se envió exitosamente')
            }
        })
        return result
    }
    catch(error){
        console.error('error')
        return false
    }
}   

const getAllProducts = async (limit) => {
    try{
        const query = 'SELECT * FROM productos'
        const result = (await pool.promise().query(query))[0]

        if(limit){
            return result.splice(limit)
        }
        else{
            return result
        }
    }
    catch(error){
            console.error(error)
        }
}


getAllProducts() //si pones el numero adentro tendras un limite

const getProductById = async (pid) => {
    try{
        const query = `SELECT * FROM productos WHERE Id = (?)`
        const result = (await pool.promise().query(query,[pid]))[0]
        return result[0]
    }
    catch(error){
        console.error(error)
        return false
    }        
}


//getProductById(2)

const deleteProductById = async (pid) => {
    try{
        const query = `DELETE FROM productos WHERE Id = (?)`
        const result = await pool.promise().query(query,[pid])
        if(result.affectedRows == 0){
            return 404
        }
        return result
    }
    catch(error){
        console.error(error)
        return false
    } 
}

deleteProductById()


/* createProduct({nombre: 'teclado logitech', price: 50, stock: 30, descripcion: 'teclado funcional mecanico'}) */



module.exports= {createProduct, getAllProducts, getProductById, deleteProductById}
