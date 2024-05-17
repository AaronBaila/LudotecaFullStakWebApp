import Router from "express"; //Importo el enrutador/Router para poder gestionar los endpoints
import { postCategoria, postAutor, postJuego, filtrarJuegos} from "./funciones/funcionesPost.js";
import { getCategorias, checkIdCategorias, checkIdAutores, checkIdJuego, getAutores, getJuegos} from "./funciones/funcionesGet.js";
import { eliminarCategoria, eliminarAutor, eliminarJuego } from "./funciones/funcionesDelete.js";
import { actualizarCategoria, actualizarAutor, actualizarJuego } from "./funciones/funcionesUpdate.js";
import { login, verifyToken, signup } from "./funciones/funcionesAuth.js";
import multer from "multer"; //Para convertir el multipart/form data que llega del post a formato Json
 
export const enrutador = Router()  //Instancio el enrutador

const upload = multer() //Instancio multer

//POST
enrutador.route("/signup").post(upload.none(), signup)
enrutador.route('/login').post(upload.none(), login)
enrutador.route('/postcategoria').post(upload.none(), verifyToken, postCategoria) //Uso la instancia de multer para convertir el multipart/form data que llega del post a formato Json
enrutador.route('/postautor').post(upload.none(), verifyToken, postAutor)
enrutador.route('/postjuego').post(upload.none(), verifyToken, postJuego)
enrutador.route('/filtrarjuegos').post(upload.none(), filtrarJuegos)

//GET
enrutador.route('/checkidcategorias').get(checkIdCategorias)
enrutador.route('/checkidautores').get(checkIdAutores)
enrutador.route('/checkidjuegos').get(checkIdJuego)

enrutador.route('/getcategorias').get(getCategorias)
enrutador.route('/getautores').get(getAutores)
enrutador.route('/getjuegos').get(getJuegos)

//UPDATE
enrutador.route("/actualizarcategoria:id").post(upload.none(), verifyToken, actualizarCategoria)
enrutador.route("/actualizarautor:id").post(upload.none(), verifyToken, actualizarAutor)
enrutador.route("/actualizarjuego:id").post(upload.none(), verifyToken, actualizarJuego)

//DELETE
enrutador.route("/eliminarcategoria:id").delete(verifyToken, eliminarCategoria)
enrutador.route("/eliminarautor:id").delete(verifyToken, eliminarAutor)
enrutador.route("/eliminarjuego:id").delete(verifyToken, eliminarJuego)