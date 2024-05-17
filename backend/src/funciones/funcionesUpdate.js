import { Categoria, Autor, Juego } from "../BBDD/modelos.js";

export function actualizarCategoria(req,res){
    //Obtengo los datos del frontend y genero los objetos busqueda y actualización (el cual contiene los datos a actualizar)
    let busqueda = {
        id:req.params.id.slice(1)
    }
    let actualizacion = {
        nombre:req.body.nombre
    }

    //Busco y actualizo el documento correspondiente
    Categoria.findOneAndUpdate(busqueda, actualizacion).then(data =>{
        res.json({
            status:"EXITO",
            message:"Categoría actualizada con exito"
        })
    }).catch(err =>{
        console.log(err)
        res.json({
            status:"ERROR",
            message:"Un error ocurrió al actualizar la categoría"
        })
    })
}


export function actualizarAutor(req,res){
    let busqueda = {
        id:req.params.id.slice(1)
    }

    let actualizacion = {
        nombre:req.body.nombre,
        nacionalidad:req.body.nacionalidad
    }

    Autor.findOneAndUpdate(busqueda, actualizacion).then(data =>{
        res.json({
            status:"EXITO",
            message:"Autor actualizado con exito"
        })
    }).catch(err =>{
        console.log(err)
        res.json({
            status:"ERROR",
            message:"Un error ocurrió al actualizar el autor"
        })
    })
}

export function actualizarJuego(req,res){
    let busqueda = {
        id:req.params.id.slice(1)
    }

    let actualizacion = {
        titulo:req.body.titulo,
        edad:req.body.edad,
        categoria_id:req.body.categoria_id,
        autor_id:req.body.autor_id
    }

    Juego.findOneAndUpdate(busqueda, actualizacion).then(data =>{
        res.json({
            status:"EXITO",
            message:"Juego actualizado con exito"
        })
    }).catch(err =>{
        console.log(err)
        res.json({
            status:"ERROR",
            message:"Un error ocurrió al actualizar el juego"
        })
    })
}