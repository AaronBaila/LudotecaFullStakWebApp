import { Component } from '@angular/core';
import { ServiciosauthService } from '../../servicios/auth/serviciosauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(public servicioAuth:ServiciosauthService, private enrutador:Router){}

  itsLoggedIn = false //Variable que comprueba si estas loggeado para asi mostrar una interfaz diferente

  //Funcion para cerrar seción
  logout(){
    this.servicioAuth.logOutService()
    this.enrutador.navigate(["/"])
  }
}
