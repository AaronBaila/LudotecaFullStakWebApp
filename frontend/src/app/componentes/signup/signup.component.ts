import { Component } from '@angular/core';
import { ServiciosauthService } from '../../servicios/auth/serviciosauth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private serviciosAuth:ServiciosauthService, private enrutador:Router){}

  //Variables de error
  varErrorCamposVacios = false
  varErrorPassword = false
  varErrorEmail = false

  crearAdmin(nombre:HTMLInputElement, email:HTMLInputElement, rol:HTMLSelectElement, password:HTMLInputElement){
    //Reseteo los errores
    this.varErrorCamposVacios = false
    this.varErrorPassword = false
    this.varErrorEmail = false

    //Compruebo que los campos se han rellenado correctamente si no cambiamos la varibale de error para mostrarlo en el FrontEnd(HTML)
    if (email.value == "" || nombre.value == "" || password.value == ""){
      this.varErrorCamposVacios = true
    }else if(password.value.length<8){
      this.varErrorPassword = true
      this.varErrorCamposVacios = false
      this.varErrorEmail = false
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)){
      this.varErrorEmail = true
      this.varErrorPassword = false
      this.varErrorEmail = false
    }else{ //En caso de que los campos se rellenen correctamente, hacemos uso del servicio para realizar la petición POST al servidor Backend
      //Servicio auth
      this.serviciosAuth.signUpService(nombre.value, email.value, rol.value, password.value).subscribe(
        res =>{
          let objToken: any = {} //Inicializo el objeto como any para que no de error, ya que puede ser que no devuelva token y este vacío
          objToken = res //Almaceno el token
          sessionStorage.setItem('token', objToken.token) //Almaceno el token en sessionStorage del navegador
          this.enrutador.navigate(['/'])
        },
        err => {console.log(err)}
      )
    }

    return false //Es necesario que la funcion retorne un Booleano (no se porque pero si no no puedo obtener los Inputs del HTML)


  }

}
