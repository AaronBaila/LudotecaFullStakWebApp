import mongoose from 'mongoose';

// *** VARIABLES ***
const url = "mongodb+srv://aaronbaila:TravisBickle@ludoteca.jdl5kr1.mongodb.net/ludoteca?retryWrites=true&w=majority&appName=Ludoteca"

// *** FUNCIONES ***
export async function conexionBBDD(){ //Función que realiza la conexión a la BBDD
    try {
        let db = await mongoose.connect(url) //Nos conectamos a la url
        console.log('Conectado a la BBDD')
        return db
    } catch (error) {
        console.log(error)
    }
}

/*
export async function cerrarConexionBBDD() { //Función para cerrar conexión
    try {
        if (db) {
            await mongoose.disconnect() //Me desconecto
            console.log('Conexión a la BBDD cerrada correctamente')
        } else {
            console.log('No hay conexión activa a la BBDD para cerrar')
        }
    } catch (error) {
        console.log('Error al cerrar la conexión a la BBDD:', error)
    }
}*/