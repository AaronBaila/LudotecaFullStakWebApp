import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ServiciosdeleteService {

  constructor(private http:HttpClient) { }

  //Funcion para eliminar una categoria
  eliminarCategoria(id:string, token:any){
    let eliminarCategoriaURL = "http://localhost:3000/eliminarcategoria:" + id //URL peticiones al Backend. A la URL le paso el id del usuario a eliminar

    return this.http.delete(eliminarCategoriaURL, {headers: {'token':token}}) //Paso el token mediante los headers
  }

  //Funcion para eliminar un autor
  eliminarAutor(id:string, token:any){
    let eliminarAutorURL = "http://localhost:3000/eliminarautor:" + id

    return this.http.delete(eliminarAutorURL, {headers: {'token':token}})
  }

  //Funcion para eliminar un juego
  eliminarJuego(id:string, token:any){
    console.log("TOKEN")
    console.log(token)
    let eliminarJuegoURL = "http://localhost:3000/eliminarjuego:" + id

    return this.http.delete(eliminarJuegoURL, {headers: {'token':token}})
  }
}
