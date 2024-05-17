//IMPORTACIONES 
import express from "express"; //Framework para servidor API en js
import morgan from "morgan"; //Middleware para ver las peticiones
import { enrutador } from "./rutas.js"; //Importo el enrutador (gestionar endpoints)
import cors from 'cors'; //Cross-Origin Resource Sharing (permitir que una aplicación web en un dominio acceda a recursos en otro dominio)
import { conexionBBDD } from "./BBDD/db.js"; //Importo la funciónn que realiza la conexión con la BBDD
import cookieSession from "cookie-session"; //Para gestionar sesiones de usuario 

//Variables Servidor: 
const app = express() //Instancio express, almacena el objeto express en app (representa la aplicación web/servidor)
app.set('port', process.env.PORT || 3000)  //Indico puerto ( process.env.PORT por si se utiliza en un entorno que te proporcione el puerto auntomáticamente)
 

//Middlewares
app.use(cookieSession({ 

    name:"cookie-session", //Nombre de la cookie
    
    secret: "COOKIE_SECRET", //Variable que almacena el secreto de la cookie (firmar la cookie)
    
    httpOnly: true //Solo es accesible mediante el protocolo HTTP
})) 
app.use(morgan('dev'))
app.use(cors()) //Necesario para mantener comunicacion entre frontend y backend
app.use('/', enrutador)
 

//INICIO EL SERVIDOR 
iniciarServidor() 

//INICIO BBDD
conexionBBDD()


//FUNCIONES 
function iniciarServidor(){ 
    app.listen(app.get('port'), ()=>{ //Inicio el servidor poniendo a escuchar las peticiones entrantes por el puerto indicado
        console.log("Server funcionando en el puerto: " + app.get('port')) 
    }) 
} 