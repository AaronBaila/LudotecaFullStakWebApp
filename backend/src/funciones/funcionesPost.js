import { Autor, Categoria, Juego } from "../BBDD/modelos.js";

export function postCategoria(req,res){
    //Obtengo los datos del req.body
    let id = req.body.id
    let nombre = req.body.nombre
    
    //Creo el nuevo objeto a guardar en la BBDD mediante el uso del Schema
    let categoria = new Categoria({
        id:id,
        nombre:nombre
    })

    //Guardo la categoría
    categoria.save().then(result => {
        res.json({
            status:"EXITO",
            message:"Categoría guardada con exito",
            data:result
        })
    }).catch(err =>{
        console.log(err)
        res.json({
            status:"ERROR",
            message:"Un error ocurrió al guardar la categoría"
        })
    })
}


export function postAutor(req,res){
    let id = req.body.id
    let nombre = req.body.nombre
    let nacionalidad = req.body.nacionalidad
    
    let autor = new Autor({
        id:id,
        nombre:nombre,
        nacionalidad:nacionalidad
    })

    autor.save().then(result => {
        res.json({
            status:"EXITO",
            message:"Autor guardado con exito",
            data:result
        })
    }).catch(err =>{
        console.log(err)
        res.json({
            status:"ERROR",
            message:"Un error ocurrió al guardar el autor"
        })
    })
}

export function postJuego(req, res){
    let id = req.body.id
    let titulo = req.body.titulo
    let edad = req.body.edad
    let categoria_id = req.body.categoria_id
    let autor_id = req.body.autor_id
    
    let juego = new Juego({
        id:id,
        titulo:titulo,
        edad:edad,
        categoria_id:categoria_id,
        autor_id:autor_id
    })

    juego.save().then(result => {
        res.json({
            status:"EXITO",
            message:"Juego guardado con exito"
        })
    }).catch(err =>{
        console.log(err)
        res.json({
            status:"ERROR",
            message:"Un error ocurrió al guardar el juego"
        })
    })
}

//FILTRAR
//Función que permite buscar/filtrar juegos segun los datos que llegan del frontEnd
export function filtrarJuegos(req, res){
    //Obtengo los datos del req.body
    let titulo = req.body.titulo
    let categoria_id = req.body.categoria_id

    //Creo la expresión regex que permite buscar strings por parecido, independientemente si se equivoca en el orden de las palabras
    //Si en las palabras te equivocas en algun caracter no lo encentra (hay que añadirlo)
    const regexBusqueda = escapeRegExp(titulo)
    const regex = new RegExp(regexBusqueda, 'i')

    //Creo el objeto busqueda con los datos a buscar
    const busqueda = {
        titulo: regex,
        categoria_id: categoria_id // Filtro por el categoria_id específico
    }

    //Realizo la busqueda y envio el resultado del filtro
    Juego.find(busqueda).sort({ id: 1 }).then(result => {
        res.send(result)
    }).catch(err =>{
        console.log(err)
        res.json({
            status:"ERROR",
            message:"Un error ocurrío al realizar el filtro"
        })
    })
}

// Función para escapar caracteres especiales en una cadena para usar en una expresión regular
function escapeRegExp(texto) {
    return texto.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}