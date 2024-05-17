import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ServiciosauthService {

  constructor(private http:HttpClient, private router:Router) { }

  //IMPORTANTE: LOS TOKEN GENERADOS CADUCAN EN 1H

  // **** Servicio para registrar un usuario nuevo **** 
  signUpService(nombre:string, email:string, rol:string, password:string){
    let signUpURL = "http://localhost:3000/signup" //URL peticiones Backend
    
    //Creamos un FormData para almacenar los inputs y poder pasarlos mediante una peticion post (uso de HttpClient) a el backend 
    const fd = new FormData()

    //Mediante append, insertamos los datos en el formData
    fd.append("nombre", nombre)
    fd.append("email", email)
    fd.append("rol", rol)
    fd.append("password", password)

    return this.http.post(signUpURL, fd)
  }

  // **** Servicio para login **** 
  loginService(email:string, password:string){
    let loginURL = "http://localhost:3000/login" //URL peticiones Backend

    const fd = new FormData()
   
    fd.append("email", email)
    fd.append("password", password)

    return this.http.post(loginURL, fd)
  }

  // **** Servicio para comprobar si un usuario esta loggeado **** 
  isLoggedService(){ //Funcion para comprobar si hay un usuario logeado
    if(sessionStorage.getItem('token') == "undefined"){
      sessionStorage.removeItem('token')
      return false
    }else{
      //Con !! devuelve true si existe el token dentro del sessionStorage
      return !!sessionStorage.getItem('token')
    }
  }

  // **** Servicio para cerrar la sesion de un usuario **** 
  logOutService(){ //Funcion para cerrar sesion eliminando el token
    sessionStorage.removeItem('token')
  }
}
