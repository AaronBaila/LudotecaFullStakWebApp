//IMPORTACIONES
import { Usuario } from "../BBDD/modelos.js"; //Importo el schema usuario
import jwt from "jsonwebtoken"; //Libreria que nos permite usar JWT para las autenticaciones con token
import bcrypt from "bcryptjs"; //Para cifrar contraseñas y compararlas de manera segura

const TOKEN_KEY = "Ludotecatan" //Clave secreta utilizada en el proceso de creación y verificación de tokens de autenticación

// *** FUNCIONES *** 
export function signup(req, res){ //Función que permite regístrate en el sistema
    //Obtengo los datos del req.body
    let {nombre, password, email, rol} = req.body
    nombre = nombre.trim()
    email = email.trim()
    rol = rol.trim()
    password = password.trim()

    //VALIDACIÓN DE CAMPOS
    if(nombre == "" || email == "" || password == ""){ //Compruebo si los campos están vacíos
        res.json({
            status:"ERROR",
            message:"Campos vacíos"
        })
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){ //Compruebo que el email sea en formato email, a@a.com
        res.json({
            status:"ERROR",
            message:"Campo email rellenado incorrectamente"
        })
    }else if(password.length < 8){ //Compruebo que la contraseña sea mayor a 8 digitos
        res.json({
            status:"ERROR",
            message:"Contraseña demasiado corta"
        })
    }else{ //Si todos los campos estan correctos, creamos el usuario
        //CREACIÓN DE USUARIO
        Usuario.find({email}).then(result =>{ //Mediante mongoose busco si hay un usuario con el email ya registrado
            if(result.length){ //En caso de que resultado tenga longitud, es que ha encontrado un usuario ya registrado con el email
                res.json({
                    status:"ERROR",
                    message:"El usuario con email: " + email + " ya existe"
                })
            }else{ //En caso de que no exista dicho usuario, lo creamos
                //Gestión de contraseña
                const saltRounds = 10 //Para el encriptado (saltos a realizar a el momento de encriptar)
                bcrypt.hash(password, saltRounds).then(hashedPassword =>{ //Creo el hash encriptando la contraseña
                    const nuevoUsuario = new Usuario ({ //Creo el objeto usuario definido en el schema creado con mongoose
                        nombre,
                        email,
                        rol,
                        password : hashedPassword, //Guarda la contraseña encriptada
                        token: "empty" //Guarda el token como vacío, para posteriormente crearlo y guardarlo
                    })

                    //CREO EL TOKEN
                    const token = jwt.sign(
                        {user_id: nuevoUsuario._id, email}, //Creamos el Token con el ID y el Email (El ID lo genera solo mongoose al crear un nuevo objeto del schema definido)
                        TOKEN_KEY, //También se utiliza el token key que puede ser cualquier string (caracteres que ayudan a crear el token)
                        {expiresIn:"1h"} //El token dejará de ser válido tras 1 horas
                    )
                    nuevoUsuario.token = token //Guardo el token generado en el campo token del objeto user
                    
                    //Guardo el usuario creado en la BBDD, mediante una función de mongoose (save)
                    nuevoUsuario.save().then(result =>{
                        res.json({token}) //Una vez guardado el usuario, enviamos el token al frontEnd para así poder usarlo (guardarlo en el navegador (en memoria local o en cookies))
                    }).catch(err => {
                        console.log(error)
                        res.json({
                            status:"ERROR",
                            message:"Un error ocurrió tras intentar guardar un usuario"
                        })
                    })

                }).catch(err =>{ //Gestiono los posibles errores al tratar de crear el hash
                    console.log(err)
                    res.json({
                        status:"ERROR",
                        message:"Un error ocurrió tras tratar de crear el hash"
                    })
                })
            }
        }).catch(err =>{ //Gestiono los posibles errores al intentar verificar si el usuario existe buscando en la BBDD
            console.log(err)
            res.json({
                status:"ERROR",
                message:"Un error ocurrió tras verificar la existencia de un usuario"
            })
        })
        
    }
}

export function login(req,res){ //Función que permite iniciar sesión
    //Obtengo los datos del req.body
    let {email, password} = req.body
    email = email.trim()
    password = password.trim()

    //VALIDACIÓN DE CAMPOS
    if(email == "" || password == ""){ //Compruebo que los campos no estén vacíos
        res.json({
            status:"ERROR",
            message:"Campos vacíos"
        })
    }else{
        //VALIDACIÓN DE USUARIO (comparo datos proporcionados en login con los de la BBDD)
        Usuario.find({email}).then(data =>{ //Busco si el usuario con el email proporcionado existe
            if(data.length){ //Si data tiene longitud es que si existe ya que la busqueda arroja resultados  
                
                const hashedPassword = data[0].password //Obtengo la pass hasheada(encriptada) del usuario encontrado

                const nuevoUsuario = new Usuario({ //Creo el objeto nuevoUsuario mediante el shcema de mongoose y los datos del usuario existente de la BBDD
                    nombre:data[0].nombre,
                    email:data[0].email,
                    password:data[0].password,
                    token:"empty"
                })

                //Comparo el password que nos pasa el usuario con el que esta almacenado
                bcrypt.compare(password, hashedPassword).then(result=>{
                    if(result){ // Si el resultado de la comparación es "TRUE" la contraseña es correcta
                        
                        //CREO EL TOKEN
                        const token = jwt.sign( //Creo el Token con el userID(creado automáticamente por mongoose con el schema) y el email
                            {user_id:nuevoUsuario._id, email},
                            TOKEN_KEY,
                            {expiresIn: "1h"} //El token dejará de ser válido tras 1 hora
                        )
                        nuevoUsuario.token = token //Guardo el token en el objeto usuario

                        //Utilizo los objetos de abajo para actualizar el token a la hora de hacer login (cambio el token antiguo por el nuevo)
                        let objectSearch = {
                            email:data[0].email
                        }

                        let objectUpdate = {
                            token:token
                        }

                        //Actualizo el token antiguo por el nuevo en la BBDD
                        Usuario.findOneAndUpdate(objectSearch, objectUpdate).then(data =>{
                            console.log("Token actualizado con exito")
                        }).catch(err =>{
                            console.log(err)
                            res.json({
                                status:"ERROR",
                                message:"Un error ocurrió tras actualizar el token"
                            })
                        })
                        
                        res.json({token}) //Envio el token al frontEnd para asi poder usarlo
                    
                    }else{ //(Contraseña Incorrecta) En caso de que la contraseña no coincida
                        res.json({
                            status:"ERROR",
                            message:"Contraseña incorrecta"
                        })
                    }

                }).catch(err =>{ //Gestiono los posibles errores al comparar las contraseñas con bcrypt
                    console.log(err)
                    res.json({
                        status:"ERROR",
                        message:"Un error ocurrión al tratar de comparar las contraseñas"
                    })
                })

            }else{ //En caso de que no exista un usuario con el email proporcionado
                res.json({
                    status:"ERROR",
                    message:"El email no existe"
                })
            }

        }).catch(err =>{ //Gestiono posibles errores al tratar de encontrar le usuario con mongoose en la BBDD
            console.log(err)
            res.json({
                status:"ERROR",
                message:"Un error ocurrión al tratar de encontrar el email proporcionado "
            })
        })
    }
}


// *** AUTH ***

//FUNCION AUTH
export const verifyToken = (req, res, next) =>{ //Función que verifica si el token que llega del frontend es valido
    const token = req.headers["token" /*x-access-token*/] //Obtengo el token

    if(!token){ //En caso de no encontrar un token
        
        return res.status(403).send("Tienes que iniciar sesión, un token es requerido")
    
    }else{ //En caso de encontrar token, verifico que el token es correcto con nuestra token_key
        
        try{ //Verifico que el token es correcto con mi token_key

            const tokenDecoded = jwt.verify(token, TOKEN_KEY) //(Contenido que esta dentro del token) descodifico el token(y vemos si es correcto) y lo almacenamos en una variable
            req.usuario = tokenDecoded //El token lo guardo para que el resto de funciones puedan utilizar estos datos, todas las funciones tienen el objeto req, por lo tanto lo guardamos en el objeto req, creando la propiedad user (req.user)
        
        }catch(err){
            return res.status(401).send("Token invalido")
        }
        return next() //Continuamos con la siguiente función de la ruta
    }
}