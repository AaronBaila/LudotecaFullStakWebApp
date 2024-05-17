import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiciosupdateService {

  constructor(private http:HttpClient) { }

  actualizarCategoria(id:string, nombre:string, token:any){    
    let actualizarCategoriaURL = "http://localhost:3000/actualizarcategoria:" + id //URL peticiones Backend, le pasamos el id de la categoría a actualizar

    //Creo un FormData para almacenar los inputs y poder pasarlos mediante una peticion post (uso de HttpClient) a el backend
    const fd = new FormData()

    //Mediante append, inserto los datos en el formData
    fd.append("nombre", nombre)
    
    return this.http.post(actualizarCategoriaURL, fd,  {headers: {'token':token}})
  }

  actualizarAutor(id:string, nombre:string, nacionalidad:string, token:any){    
    let actualizarAutorURL = "http://localhost:3000/actualizarautor:" + id

    const fd = new FormData()

    fd.append("nombre", nombre)
    fd.append("nacionalidad", nacionalidad)
    
    return this.http.post(actualizarAutorURL, fd, {headers: {'token':token}})
  }

  actualizarJuego(id:string, titulo:string, edad:string, categoria_id:string, autor_id:string, token:any){    
    let actualizarJuegoURL = "http://localhost:3000/actualizarjuego:" + id

    const fd = new FormData()

    fd.append("id", id)
    fd.append("titulo", titulo)
    fd.append("edad", edad)
    fd.append("categoria_id", categoria_id)
    fd.append("autor_id", autor_id)

    return this.http.post(actualizarJuegoURL, fd, {headers: {'token':token}})
  }
}
