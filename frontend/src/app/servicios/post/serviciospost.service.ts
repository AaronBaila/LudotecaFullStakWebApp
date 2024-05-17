import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiciospostService {

  constructor(private http:HttpClient) { } 

  postCategoria(id:string, nombre:string, token:any){    
    const postCategoriaURL = "http://localhost:3000/postcategoria" //URL peticiones Backend

    //Creo un FormData para almacenar los inputs y poder pasarlos mediante una peticion post (uso de HttpClient) a el backend
    const fd = new FormData()

    //Mediante append, inserto los datos en el formData
    fd.append("id", id)
    fd.append("nombre", nombre) 
    
    return this.http.post(postCategoriaURL, fd, {headers: {'token':token}}) //Paso el formData(datos del frontEnd) a el backend mediante el uso de HttpClient
  }

  postAutor(id:string, nombre:string, nacionalidad:string, token:any){    
    const postAutorURL = "http://localhost:3000/postautor"

    const fd = new FormData()

    fd.append("id", id)
    fd.append("nombre", nombre) 
    fd.append("nacionalidad", nacionalidad) 
    
    return this.http.post(postAutorURL, fd, {headers: {'token':token}})
  }

  postJuego(id:string, titulo:string, edad:string, categoria_id:string, autor_id:string, token:any){    
    const postJuegoURL = "http://localhost:3000/postjuego"

    const fd = new FormData()

    fd.append("id", id)
    fd.append("titulo", titulo) 
    fd.append("edad", edad) 
    fd.append("categoria_id", categoria_id) 
    fd.append("autor_id", autor_id) 
    
    return this.http.post(postJuegoURL, fd,  {headers: {'token':token}})
  }

  filtrarJuegos(titulo:string, categoria_id:string){    
    const filtrarJuegosURL = "http://localhost:3000/filtrarjuegos"

    const fd = new FormData()

    fd.append("titulo", titulo)
    fd.append("categoria_id", categoria_id)
    
    return this.http.post(filtrarJuegosURL, fd)
  }
}
