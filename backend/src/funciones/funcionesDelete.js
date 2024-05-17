import { Autor, Categoria, Juego } from "../BBDD/modelos.js";

export function eliminarCategoria(req, res){
    //Mediante req.params.id obtengo el id del frontend de la URL
    Categoria.findOneAndDelete({id:req.params.id.slice(1)}).then(result =>{ //Mediante el id busco el anuncio a eliminar mediante mongoose
        res.json({
            status:"EXITO",
            message:"Categoría eliminada con exito",
            data:result
        })
    }).catch(err =>{
        console.log(err)
        res.json({
            status:"ERROR",
            message:"Un error ocurrió en la eliminación de la categoría"
        })
    })
}


export function eliminarAutor(req, res){
    //Mediante req.params.id obtengo el id del frontend de la URL
    Autor.findOneAndDelete({id:req.params.id.slice(1)}).then(result =>{ //Mediante el id busco el anuncio a eliminar mediante mongoose
        res.json({
            status:"EXITO",
            message:"Autor eliminado con exito",
            data:result
        })
    }).catch(err =>{
        console.log(err)
        res.json({
            status:"ERROR",
            message:"Un error ocurrió en la eliminación del autor"
        })
    })
}

export function eliminarJuego(req, res){
    //Mediante req.params.id obtengo el id del frontend de la URL
    Juego.findOneAndDelete({id:req.params.id.slice(1)}).then(result =>{ //Mediante el id busco el anuncio a eliminar mediante mongoose
        res.json({
            status:"EXITO",
            message:"Juego eliminado con exito",
            data:result
        })
    }).catch(err =>{
        console.log(err)
        res.json({
            status:"ERROR",
            message:"Un error ocurrió en la eliminación del juego"
        })
    })
}