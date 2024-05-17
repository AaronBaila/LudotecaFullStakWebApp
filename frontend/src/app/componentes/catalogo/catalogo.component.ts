import { Component} from '@angular/core';
import { ServiciosgetService } from '../../servicios/get/serviciosget.service';
import { ServiciospostService } from '../../servicios/post/serviciospost.service';
import { ServiciosdeleteService } from '../../servicios/delete/serviciosdelete.service';
import { ServiciosupdateService } from '../../servicios/update/serviciosupdate.service';
import { ServiciosauthService } from '../../servicios/auth/serviciosauth.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})

export class CatalogoComponent {

  constructor(private serviciosPost:ServiciospostService, private serviciosGet:ServiciosgetService, private serviciosDelete:ServiciosdeleteService, private serviciosUpdate:ServiciosupdateService, public servicioAuth:ServiciosauthService){ }//Instancio el servicio

  //*** VARIABLES ***
  idnum:any //Almacena el ultimo id a usar (se usa en caso de crear un nuevo juego)
  arrayJuegos:any //Almacena todos los juegos
  arrayCategorias:any //Almacena todas las categorias
  arrayAutores:any //Almacena todos los autores
  
  varMostrarForm = false //Booleano que permite controlor si mostrar el formulario o no
  permisoEdicion = false //Variable que almacena si tenemos permisos de edicion o no
  itsEdit = false //Variable que indica si estoy realizando una edición o no (permite mostrar un formulario u otro)
  varPopupResultado = false //Variable que permite mostrar el popup con el resultado de guardar un juego
  objectoResultado:any //Variable que almacena el objeto que devuelve una operación de un servicio
  varResultado = "" //Variable que almacena el mensaje a mostrar de una operación

  //Variables auxiliares (permiten mostrar datos ya guardados en la bbdd en el forntEnd de manera que si editas un juego, aparece en el formulario los datos del juego a editar)
  varAuxiliarEditId = "" //Almacena ID del juego a editar
  varAuxiliarEditTitulo = "" //Almacena titulo del juego a editar
  varAuxiliarEditEdad =  "" //Almacena edad del juego a editar
  varAuxiliarEditCategoria =  "" //Almacena la categoria del juego a editar
  varAuxiliarEditAutor = "" //Almacena el autor del juego a editar
  autorIDAuxiliar = "" //Almacena el id de la categoría del juego a editar
  categoriaIDAuxiliar = "" //Almacena el id del autor del juego a editar

  //Variables de mensaje de error:
  varErrorPermisos = false //Variable que sirve para mostrar popup de error o no, indica si han intententado acceder sin permisos a una funcionalidad
  errorTitulo = false //Si el titulo esta vacio
  errorEdad = false //Si edad esta vacia o no es un número
  errorCategoria = false //Si no selecciono categoria
  errorAutor = false //Si no selecciono autor


  // *** FUNCIONES ***
  ngOnInit() { //Funcion que se va a ejecutar nada mas cargar el componente
    //Compruebo si el usuario esta loggeado para asi darle permisos de edición
    if(this.servicioAuth.isLoggedService()){
      this.permisoEdicion = true
    }else{
      this.permisoEdicion = false
    }

    //Obtengo las categorías
    this.serviciosGet.getCategorias().subscribe(
      res=>{
        this.arrayCategorias = res

        //Obtengo los autores
        this.serviciosGet.getAutores().subscribe(
          res=>{
            this.arrayAutores = res

            //Obtengo los juegos
            this.serviciosGet.getJuegos().subscribe(
              res => {
                this.arrayJuegos = res
        
                //Asocio el categoria_id con el nombre de la categoria que corresponde a el id
                for(let i = 0; i<=this.arrayJuegos.length-1; i++){
                  let x = 0
                  while (x <= this.arrayCategorias.length - 1) {
                    if (this.arrayJuegos[i].categoria_id === this.arrayCategorias[x].id) {
                      this.arrayJuegos[i].categoria_id = this.arrayCategorias[x].nombre + " " + this.arrayJuegos[i].categoria_id
                      break
                    }
                    x++
                  }
                }
        
                //Asocio el autor_id con el nombre del autor que corresponde al id
                for(let i = 0; i<=this.arrayJuegos.length-1; i++){
                  let x = 0
                  while (x <= this.arrayAutores.length - 1) {
                    if (this.arrayJuegos[i].autor_id === this.arrayAutores[x].id) {
                      this.arrayJuegos[i].autor_id = this.arrayAutores[x].nombre + " " + this.arrayJuegos[i].autor_id
                      this.arrayJuegos[i].nacionalidad =  this.arrayAutores[x].nacionalidad
                      break
                    }
                    x++
                  }
                }
              },
              err =>{console.log(err)}
            )

          },
          err=>{console.log(err)}
        )

      },
      err=>{console.log(err)}
    )

    //Saco el ultimo id a utilizar (es decir si creo un nuevo juego, cual va a ser el id a usar)
    this.serviciosGet.checkIdJuegos().subscribe(
      res => {
        this.idnum = res
      },
      err =>{console.log(err)}
    )
  }

  //Mostrar el formulario de creación de juego
  mostrarForm(){
    //Compruebo si tenemos permisos de edición
    if(this.permisoEdicion){
      if(this.idnum == '0'){ //Si el id es 0 (es el primer juego que se crea) le asocias el id 1
        this.idnum = '1'
      }
  
      this.varMostrarForm = true //Mostramos el formulario
    }else{
      //En caso de no tener permisos, se muestran los errores pertinentes
      this.varErrorPermisos = true //Muestro error permisos
    }
  }

  //Mostrar el formulario de edición de juego
  mostrarFormEdicion(id:string, titulo:string, edad:string, categoria_id:string, autor_id:string){
    //Compruebo si tenemos permisos para poder editar un juego
    if(this.permisoEdicion){
      this.itsEdit = true //Indicamos que es una edición y por lo tanto tiene que mostrar el formulario para editar
      this.varMostrarForm = true //Mostramos el formulario

      //Le damos valor a todas las variables auxiliares con los valores del juego a editar
      this.varAuxiliarEditId = id
      this.varAuxiliarEditTitulo = titulo
      this.varAuxiliarEditEdad = edad
      this.varAuxiliarEditCategoria = categoria_id.slice(0, -2)
      this.categoriaIDAuxiliar = categoria_id.slice(-1)
      this.autorIDAuxiliar = categoria_id.slice(-1) 
      this.varAuxiliarEditAutor = autor_id.slice(0, -2)
    }else{
     //En caso de no tener permisos, se muestran los errores pertinentes
     this.varErrorPermisos = true //Muestro error permisos
    }
  }

  cerrarForm(){
    this.varMostrarForm = false
  }

  cerrarFormEdicion(){
    this.varMostrarForm = false //Cerramos el formulario
    this.itsEdit = false //Al cerrarlo ya no es una edición

    //Quitamos el valor a las variables auxiliares
    this.varAuxiliarEditId = ""
    this.varAuxiliarEditTitulo = ""
    this.varAuxiliarEditEdad = ""
    this.varAuxiliarEditCategoria =  ""
    this.categoriaIDAuxiliar = ""
    this.autorIDAuxiliar = ""
    this.varAuxiliarEditAutor = ""
  }

  cerrarErrorPermisos(){
    this.varErrorPermisos = false
  }

  //Recargar tras guardar autor
  recargarPagina(){
    window.location.reload()
  }

  //Funcion para guardar juego
  postJuego(titulo:HTMLInputElement, edad:HTMLInputElement, categoria_id:HTMLSelectElement, autor_id:HTMLSelectElement){
    //Validación campos
    if(titulo.value == ""){
      this.errorTitulo = true

      this.errorEdad = false
      this.errorCategoria = false
      this.errorAutor = false
    }else if(edad.value == "" || isNaN(parseFloat(edad.value))){
      this.errorEdad = true

      this.errorTitulo = false
      this.errorCategoria = false
      this.errorAutor = false
    }else if(categoria_id.value == ""){
      this.errorCategoria = true

      this.errorEdad = false
      this.errorTitulo = false
      this.errorAutor = false
    }
    else if(autor_id.value == ""){
      this.errorAutor = true

      this.errorEdad = false
      this.errorCategoria = false
      this.errorTitulo = false
    }else{
      let token = sessionStorage.getItem('token') //Obtengo el token para poder postear el juego ya que el backend lo requiere
      //Servicio post
      this.serviciosPost.postJuego(this.idnum, titulo.value, edad.value, categoria_id.value, autor_id.value, token).subscribe(
        res => {
          this.objectoResultado = res
          this.varResultado = this.objectoResultado.message
          this.varMostrarForm = false //Cierro el formulario de edición
          this.varPopupResultado = true //Muestro el popup con el mensaje con el resultado de la operación
        }, 
        err => {
          //TOKEN CADUCA EN 1H
          //Compruebo si da error 401 (desautorizado) lo cual significa que el token ha caducado
          if(err.status == 401){ //En caso de que el token haya caducado, indicamos que tiene que volver a iniciar sesión
            this.varResultado = "Sesión caducada, vuelva a iniciar sesión"
            this.servicioAuth.logOutService()
            this.varMostrarForm = false //Cierro el popup del formulario de edición
            this.varPopupResultado = true //Muestro el popup con el mensaje con el resultado de la operación
          }else{
            this.varMostrarForm = false //Cierro el formulario de edición
            this.varPopupResultado = true //Muestro el popup con el mensaje con el resultado de la operación
            console.log(err)
          }
        }
      )
    }
  }

  //Función para editar juego
  editarJuego(id:HTMLInputElement, titulo:HTMLInputElement, edad:HTMLInputElement, categoria_id:HTMLSelectElement, autor_id:HTMLSelectElement){
    //Validación campos
    if(titulo.value == ""){
      this.errorTitulo = true

      this.errorEdad = false
      this.errorCategoria = false
      this.errorAutor = false
    }else if(edad.value == "" || isNaN(parseFloat(edad.value))){
      this.errorEdad = true

      this.errorTitulo = false
      this.errorCategoria = false
      this.errorAutor = false
    }else{
      let token = sessionStorage.getItem('token') //Obtengo el token para poder editar el juego ya que el backend lo requiere
      //Contemplo el caso en el que no se selecciona ninguna categoria para dejar la del juego original
      if(categoria_id.value){
        this.categoriaIDAuxiliar =  categoria_id.value
      }
      //Contemplo el caso en el que no se selecciona ningun autor para dejar el del juego original
      if(autor_id.value){
        this.autorIDAuxiliar = autor_id.value
      }

      //Servicio update
      this.serviciosUpdate.actualizarJuego(id.value, titulo.value, edad.value, this.categoriaIDAuxiliar, this.autorIDAuxiliar, token).subscribe(
        res =>{
          this.objectoResultado = res
          this.varResultado = this.objectoResultado.message
          this.varMostrarForm = false //Cierro el formulario de edición
          this.varPopupResultado = true //Muestro el popup con el mensaje con el resultado de la operación
        },
        err =>{
          //TOKEN CADUCA EN 1H
          //Compruebo si da error 401 (desautorizado) lo cual significa que el token ha caducado
          if(err.status == 401){ //En caso de que el token haya caducado, indicamos que tiene que volver a iniciar sesión
            this.varResultado = "Sesión caducada, vuelva a iniciar sesión"
            this.servicioAuth.logOutService()
            this.varMostrarForm = false //Cierro el popup del formulario de edición
            this.varPopupResultado = true //Muestro el popup con el mensaje con el resultado de la operación
          }else{
            this.varMostrarForm = false //Cierro el formulario de edición
            this.varPopupResultado = true //Muestro el popup con el mensaje con el resultado de la operación
            console.log(err)
          }
        }
      )
    }
  }

  //Funcion para elminar juego
  eliminarJuego(){
    let token = sessionStorage.getItem('token') //Obtengo el token
    //Servicio delete
    this.serviciosDelete.eliminarJuego(this.varAuxiliarEditId, token).subscribe(
      res=>{
        this.objectoResultado = res
        this.varResultado = this.objectoResultado.message
        this.varMostrarForm = false //Cierro el formulario de edición
        this.varPopupResultado = true //Muestro el popup con el mensaje con el resultado de la operación
      },
      err =>{
        //TOKEN CADUCA EN 1H
        //Compruebo si da error 401 (desautorizado) lo cual significa que el token ha caducado
        if(err.status == 401){ //En caso de que el token haya caducado, indicamos que tiene que volver a iniciar sesión
          this.varResultado = "Sesión caducada, vuelva a iniciar sesión"
          this.servicioAuth.logOutService()
          this.varMostrarForm = false //Cierro el popup del formulario de edición
          this.varPopupResultado = true //Muestro el popup con el mensaje con el resultado de la operación
        }else{
          this.varMostrarForm = false //Cierro el formulario de edición
          this.varPopupResultado = true //Muestro el popup con el mensaje con el resultado de la operación
          console.log(err)
        }
      }
    )
  }

  //Funcion para filtrar juegos
  filtrarJuegos(tituloBusqueda:HTMLInputElement, categoriaBusqueda:HTMLSelectElement){
    //Servicio post
    this.serviciosPost.filtrarJuegos(tituloBusqueda.value, categoriaBusqueda.value).subscribe(
      res =>{
        this.arrayJuegos = res
      },
      err =>{console.log(err)}
    )
  }
}
