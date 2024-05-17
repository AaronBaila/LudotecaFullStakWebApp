import { Component } from '@angular/core';
import { ServiciosgetService } from '../../servicios/get/serviciosget.service';
import { ServiciospostService } from '../../servicios/post/serviciospost.service';
import { ServiciosdeleteService } from '../../servicios/delete/serviciosdelete.service';
import { ServiciosupdateService } from '../../servicios/update/serviciosupdate.service';
import { ServiciosauthService } from '../../servicios/auth/serviciosauth.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})

export class CategoriasComponent {

  constructor(private serviciosPost:ServiciospostService, private serviciosGet:ServiciosgetService, private serviciosDelete:ServiciosdeleteService, private serviciosUpdate:ServiciosupdateService, public servicioAuth:ServiciosauthService){ }//Instancio el servicio

  //*** VARIABLES ***
  idnum:any //Almacena el último id a usar (se usa en caso de crear una nueva categoría)
  arrayCategorias:any //Almacena todas las categorías

  varMostrarForm = false //Booleano que permite controlar si mostrar el formulario o no
  permisoEdicion = false //Variable que almacena si tenemos permisos de edición o no
  itsEdit = false //Variable que indica si estoy realizando una edición o no (permite mostrar un formulario u otro)
  varPopupResultado = false //Variable que permite mostrar el popup con el resultado de guardar una categoría
  objectoResultado:any //Variable que almacena el objeto que devuelve una operación de un servicio
  varResultado = "" //Variable que almacena el mensaje a mostrar de una operación

  //Variables auxiliares (permiten mostrar datos ya guardados en la bbdd en el frontEnd de manera que si editas una categoría, aparece en el formulario los datos de la categoría a editar)
  varAuxiliarEditNombre = ""
  varAuxiliarEditId =  ""

  //Variables de mensaje de error:
  varErrorPermisos = false
  errorNombre = false


  // *** FUNCIONES ***
  ngOnInit() { //Función que se va a ejecutar nada más cargar el componente
    //Compruebo si el usuario está loggeado para así darle permisos de edición
    if(this.servicioAuth.isLoggedService()){
      this.permisoEdicion = true
    }else{
      this.permisoEdicion = false
    }

    //Obtengo las categorías
    this.serviciosGet.getCategorias().subscribe(
      res => {
        this.arrayCategorias = res
      },
      err =>{console.log(err)}
    )

    //Saco el último id a utilizar (es decir, si creo una nueva categoría, cuál va a ser el id a usar)
    this.serviciosGet.checkIdCategorias().subscribe(
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
      if(this.idnum == '0'){
        this.idnum = '1'
      }
  
      this.varMostrarForm = true
    }else{
      //En caso de no tener permisos, se muestran los errores pertinentes
      this.varErrorPermisos = true //Muestro error permisos
    }
  }

  //Mostrar el formulario de edición de categoría
  mostrarFormEdicion(id:string, nombre:string){
    //Compruebo si tenemos permisos para poder editar una categoría
    if(this.permisoEdicion){
      this.itsEdit = true //Indicamos que es una edición y, por lo tanto, tiene que mostrar el formulario para editar
      this.varMostrarForm = true //Mostramos el formulario
      
      //Le damos valor a todas las variables auxiliares con los valores de la categoría a editar
      this.varAuxiliarEditId = id
      this.varAuxiliarEditNombre = nombre
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
    this.varAuxiliarEditNombre = ""
  }

  cerrarErrorPermisos(){
    this.varErrorPermisos = false
  }

  //Recargar tras guardar autor
  recargarPagina(){
    window.location.reload()
  }

  //Función para guardar categoría
  postCategoria(nombre:HTMLInputElement){
    //Validación campos
    if(nombre.value == ""){
      this.errorNombre = true
    }else{
      let token = sessionStorage.getItem('token') //Obtengo el token para poder postear la categoría, ya que el backend lo requiere
      //Servicio post
      this.serviciosPost.postCategoria(this.idnum, nombre.value, token).subscribe(
        res => {
          this.objectoResultado = res
          this.varResultado = this.objectoResultado.message
          this.varMostrarForm = false //Cierro el popup del formulario de edición
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

  //Función para editar categoría
  editarCategoria(id:string, nombre:HTMLInputElement){
    //Validación campos
    if(nombre.value == ""){
      this.errorNombre = true
    }else{
      let token = sessionStorage.getItem('token') //Obtengo el token para poder postear la categoría, ya que el backend lo requiere
      //Servicio update
      this.serviciosUpdate.actualizarCategoria(id, nombre.value, token).subscribe(
        res=>{
          this.objectoResultado = res
          this.varResultado = this.objectoResultado.message
          this.varMostrarForm = false //Cierro el formulario de edición
          this.varPopupResultado = true //Muestro el popup con el mensaje con el resultado de la operación
        },
        err=>{
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

  //Función para eliminar categoría
  eliminarCategoria(id:string){
    if(this.permisoEdicion){
      let token = sessionStorage.getItem('token') //Obtengo el token
      //Servicio delete
      this.serviciosDelete.eliminarCategoria(id, token).subscribe(
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
    }else{
      this.varErrorPermisos = true
    }
  }
}
