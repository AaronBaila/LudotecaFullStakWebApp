import mongoose from "mongoose";

const Schema = mongoose.Schema

//Schema para categorías
const categoriaSchema = new Schema({
    id: { type: String, required: true, unique: true },
    nombre: { type: String, required: true }
})

//Schema para autores
const autorSchema = new Schema({
    id: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    nacionalidad: {type: String, required: true}
})

//Schema para juegos
const juegoSchema = new Schema({
    id: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    edad: {type: String, required: true},
    categoria_id: {type: String, required: true},
    autor_id: {type: String, required: true}
})

//Schema para usuarios
const usuarioSchema = new Schema({
    nombre: {type: String, required: true},
    email: {type: String, required: true},
    rol:{type:String, required: true},
    password: {type: String, required: true},
    token: {type: String, required: true}
})

//Exportamos los schemas para poder usarlos
export const Categoria = mongoose.model("Categoria", categoriaSchema)
export const Autor = mongoose.model("Autore", autorSchema)
export const Juego = mongoose.model("Juego", juegoSchema)
export const Usuario = mongoose.model("Usuario", usuarioSchema)