import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { AutoresComponent } from './componentes/autores/autores.component';
import { CatalogoComponent } from './componentes/catalogo/catalogo.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { LoginComponent } from './componentes/login/login.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"/catalogo",
    pathMatch:"full"
  },
  {
    path:"categorias",
    component:CategoriasComponent
  },
  {
    path:"autores",
    component:AutoresComponent
  },
  {
    path:"catalogo",
    component:CatalogoComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"login",
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
