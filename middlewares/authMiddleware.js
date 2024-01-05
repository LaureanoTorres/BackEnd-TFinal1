const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next) =>{
    const token = req.header('Authorization')
    if(!token){
        return res.status(401).json({status:401, message: 'Unauthorized'})
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)
        console.log(decoded)
        /* decode.username verifica el user*/
        next()
    }
    catch(err){
        console.error(err)
        return res.status(401).json({status: 401, message: 'Invalid token'})
    }
}

module.exports = authMiddleware