

const mail = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subjet: 'Soy un mail de prueba',
    html: `
    <h1 style='background-color: blue; color: white;'>Este es un mensaje de mail</h1>
    <p>Soy un parrafo</p>
    <img src= 'http://local:8080/imagenMail.jpg'/>
    <a href= '#'>Visita este sitio</a>
    `
}

const productCreatedTemplate = (email, username) =>{
    return{
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER, /* deberia ir email pero como probamos nos lo autoenviamos */
        subjet: 'Has creado un producto' + username,
        html: `
        <h1 style='background-color: blue; color: white;'>Felicitaciones</h1>
        <p>El producto ${product.nombre} se creo satisfactoriamente</p>
        <a href= '#'>Ve el detalle de tu producto</a>
        `
    }
}

module.exports = {productCreatedTemplate}