const express = require ('express')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const cors = require('cors')


dotenv.config()

const dbQueryAsync = require('./config/dbConfig')
const productRouter = require('./router/productRouter')



const serviceProduct = require('./services/products/serviceProduct')
const { error } = require('console')
const authMiddleware = require('./middlewares/authMiddleware')



const app = express()
const PORT = process.env.PORT || 8080


app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/public'))

const secretKey = process.env.SECRET_KEY_JWT


const {pool}= require('./config/dbConfig')

app.use('/api/products/', productRouter)

const users = []

const getUserByName = async (pid) => {
    try{
        const query = `SELECT * FROM usuarios WHERE nombre = (?)`
        const result = (await pool.promise().query(query,[pid]))[0]
        return result[0]
    }
    catch(error){
        console.error(error)
        return false
    }        
}



app.post('/register', (req,res)=>{
    const {username, password} = req.body
    if(getUserByName(username)){
        return res.status(400).json({message: 'Username is not available', status: 400})
    }
    const newUser = {username, password}
    users.push(newUser)
    res.status(201).json({message: 'User was created successfully!', status: 201})
})


app.post('/login', (req,res)=>{
    const {username, password} = req.body
    const user = users.find(user => user.username == username && user.password == password)
    if(!user){
        return res.status(401).json({message: 'Invalid credentials', status: 401})
    }
    const token = jwt.sign({username, role: 'user'}, secretKey, {expiresIn: '1h'})
    res.status(200).json({accessToken: token, status: 200})
})


app.post('/auth/verify', authMiddleware, ()=>{
    res.status(200).json({status: 200, message: 'Valid token'})
})





/* to: 'mati.a.gimenez2002@gmail.com', */



/* mailerService.transport.sendMail(mail, (error, info) =>{
    if(error){
        console.log('No se pudo enviar el mensaje')
    }
    else{
        console.log('Mensaje enviado con exito')
    }
}) */

/* app.get('/api/products/:id', (req,res) => {
    const {id} = req.params
    const result = serviceProduct.getProductById(id)
    console.log(result)
    if(!result){
        res.status(500).json({ok: false, message: 'Internal server error', status: 500})
    }
    else if (result){
        res.status(200).json({ok: true, product: result, message: 'Product found', status: 200})
        }
    else{
        res.status(404).json({ok: false, product: result, message: 'Product not found', status: 404})
        }
}) */

/* app.get('/api/products/:pid', async (req, res) =>{
    try{
        const query = `SELECT * FROM productos WHERE Id = (?)`
        const {pid} = req.params
        const result = await dbQueryAsync(query,[pid])
        if(result.length == 0){
            res.status(404).json({message: 'Not Found'})
        }
        else{
            res.status(200).json({message: 'correcto', product: result[0]})
        }
    }
    catch{
        console.error(error)
        res.status(500).json({message: 'error'})
    }
}) */

app.get('/', (req, res) =>{
    res.send('Text')
})

app.listen(PORT, () =>{
    console.log('El servidor se esta escuchando en http://localhost:' + PORT + '/')
})