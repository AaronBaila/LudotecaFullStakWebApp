import { Categoria, Autor, Juego } from "../BBDD/modelos.js"; //Importo los schemas de la BBDD

export function getCategorias(req,res){
  Categoria.find().sort({ id: 1 }).then(result => {
    res.send(result)
  }).catch(err =>{
    console.log(err)
    res.json({
        status:"ERROR",
        message:"Un error ocurrió al obtener las categorías"
    })
  })
}

export function getAutores(req,res){
  Autor.find().sort({ id: 1 }).then(result => {
    res.send(result)
  }).catch(err =>{
    console.log(err)
    res.json({
        status:"ERROR",
        message:"Un error ocurrió al obtener los autores"
    })
  })
}

export function getJuegos(req,res){
  Juego.find().sort({ id: 1 }).then(result => {
    res.send(result)
  }).catch(err =>{
    console.log(err)
    res.json({
        status:"ERROR",
        message:"Un error ocurrió al obtener los juegos"
    })
  })
}

// * FUNCIONES CHECKID * --> Funciones que permiten llevar un conteo de las IDs creadas.
//En este caso utilizo async/await ya que me resulta mas fácil para el tipo de operación, aunque se podría hacer igual con then
export async function checkIdCategorias(req,res){
  const totalDocumentos = await Categoria.countDocuments() //Obtengo el numero total de documentos guardados (total de datos)

  let idAuxiliar = totalDocumentos + 1 //Cantidad de documentos + 1 (para obtener el siguiente ID en caso de crear una categoría)

  let existeResultado = await Categoria.findOne({ id: totalDocumentos.toString() }) //Compruebo si ya existe el ID

  if(!existeResultado){//En caso de que el ID no exista, pasamos el ID
    res.send((totalDocumentos.toString()))
  }else{ //En caso de que el ID exista hay que buscar un ID que no exista desde el principio (desde el número 0 hasta el último ID)
    let i = 1
    let encontrado = false

    while (i <= totalDocumentos && !encontrado) {
      let existeResultado = await Categoria.findOne({ id: i })

      //En caso de econtrar el ID, lo enviamos y paramos el bucle
      if (!existeResultado) {
        res.send(i.toString())
        encontrado = true // Cambia el valor para salir del bucle
      }
      i++
    }
    //En caso de no encontrar el ID desde el principio, se crea un ID nuevo (último id creado +1)
    if(!encontrado){
      res.send(idAuxiliar.toString())
    }
  }
}

export async function checkIdAutores(req,res){

  const totalDocumentos = await Autor.countDocuments()

  let idAuxiliar = totalDocumentos + 1

  // Busca un documento Autor cuyo id sea igual al número total de documentos
  let existeResultado = await Autor.findOne({ id: totalDocumentos.toString() })

  if(!existeResultado){
    res.send((totalDocumentos.toString()))
  }else{
    let i = 1
    let encontrado = false

    while (i <= totalDocumentos && !encontrado) {
      let existeResultado = await Autor.findOne({ id: i })

      if (!existeResultado) {
        console.log("EXISTE")
        res.send(i.toString())
        encontrado = true //Cambia el valor para salir del bucle
      }
      i++
    }
    if(!encontrado){
      res.send(idAuxiliar.toString())
    }
  }
}

export async function checkIdJuego(req,res){

  const totalDocumentos = await Juego.countDocuments()

  let idAuxiliar = totalDocumentos + 1

  // Busca un documento Autor cuyo id sea igual al número total de documentos
  let existeResultado = await Juego.findOne({ id: totalDocumentos.toString() })

  if(!existeResultado){
    res.send((totalDocumentos.toString()))
  }else{
    let i = 1
    let encontrado = false

    while (i <= totalDocumentos && !encontrado) {
      let existeResultado = await Juego.findOne({ id: i })

      if (!existeResultado) {
        console.log("EXISTE")
        res.send(i.toString())
        encontrado = true // Cambia el valor para salir del bucle
      }
      i++
    }
    if(!encontrado){
      res.send(idAuxiliar.toString())
    }
  } 
}