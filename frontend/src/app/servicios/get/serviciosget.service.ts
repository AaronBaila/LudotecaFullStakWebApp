import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiciosgetService {

  constructor(private http:HttpClient) { }

  checkIdCategorias(){
    const checkIdCategoriasURL = "http://localhost:3000/checkidcategorias"
    return this.http.get(checkIdCategoriasURL)
  }

  checkIdAutores(){
    const checkIdAutoresURL = "http://localhost:3000/checkidautores"
    return this.http.get(checkIdAutoresURL)
  }

  checkIdJuegos(){
    const checkIdJuegosURL = "http://localhost:3000/checkidjuegos"
    return this.http.get(checkIdJuegosURL)
  }

  getCategorias(){
    const getCategoriasURL = "http://localhost:3000/getcategorias"
    
    return this.http.get(getCategoriasURL)
  }

  getAutores(){
    const getAutoresURL = "http://localhost:3000/getautores"
    
    return this.http.get(getAutoresURL)
  }

  getJuegos(){
    const getJuegosURL = "http://localhost:3000/getjuegos"
    
    return this.http.get(getJuegosURL)
  }
}
