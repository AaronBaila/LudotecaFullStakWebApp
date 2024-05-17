import { Component } from '@angular/core';
import { ServiciosauthService } from '../../servicios/auth/serviciosauth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(private serviciosAuth:ServiciosauthService, private enrutador:Router){}

  //Variables de error
  varErrorCamposVacios = false
  varErrorDatosIncorrectos = false

  login(email:HTMLInputElement, password:HTMLInputElement){

    //Reseteamos los errores
    this.varErrorCamposVacios = false
    this.varErrorDatosIncorrectos = false

    if (email.value == "" || password.value == ""){
      this.varErrorCamposVacios = true //Indico que se muestre el error
    }else{ //En caso de que los campos se rellenen correctamente, hacemos uso del servicio para realizar la petición POST al servidor Backend
      //Servicio auth
      this.serviciosAuth.loginService(email.value, password.value).subscribe(
        res =>{
          let objToken: any = {} //Inicializo el objeto como any para que no de error, ya que puede ser que no devuelva token y este vacío
          objToken = res //Almaceno el token
          sessionStorage.setItem('token', objToken.token) //Almaceno el token en sessionStorage del navegador
          if(objToken.message == "El email no existe" || objToken.message == "Contraseña incorrecta"){
            this.varErrorDatosIncorrectos = true
          }else{
            this.enrutador.navigate(["/"])
          }
        },
        err => {
          console.log(err)
        }
      )
    }

    return false //Es necesario que la funcion retorne un Booleano (no se porque pero si no no puedo obtener los Inputs del HTML)
  }
}
