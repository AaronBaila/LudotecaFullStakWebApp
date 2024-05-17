# Explicación del proyecto:
Es un proyecto CRUD realizado con la pila MEAN (MongoDB, ExpressJS, AngularJS, NodeJS).
<br>
<br>
El sistema tan solo tendrá dos roles: 
  - **Usuario básico**: es el usuario anónimo que accede a la web sin registrar. Solo tiene permisos para mostrar listados.
  - **Usuario administrador**: es el usuario que se registra en la aplicación. Puede realizar las operaciones de alta, edición y borrado.
<br>
Por defecto cuando entras en la aplicación tendrás los privilegios de un usuario básico hasta que el usuario haga un login correcto con el usuario / password admin / admin. En ese momento pasara a ser un usuario administrador y podrá realizar operaciones de alta, baja y modificación.

# Estructura general de la aplicación:
**Una cabecera superior(NavBar) que contendrá:**
  - El logo y nombre de la tienda.
  - Un enlace a cada uno de los CRUD del sistema.
  - Un botón de Signin

# Datos Login:
**Email:** admin@ludoteca.com
<br>
**Password:** Admin1234

# Instalación y ejecución del proyecto:
**Instalar dependencias en Backend y FontEnd:**
<br>
En la carpeta /backend:
```bash
cd backend
npm install
```
En la carpeta /frontend:
```bash
cd frontend
npm install
```
**Ejecución:**
<br>
En la carpeta /backend:
```bash
cd backend
npm run dev
```
En la carpeta /frontend:
```bash
cd frontend
ng serve -o
```

# Imágenes:
**COMPONENTE CATÁLOGO:**<br>
**Catálogo:**
![No se ha podido cargar la imagen](imagenesDemo/Catalogo.png)<br>
<br>
**Catálogo filtro:**
![No se ha podido cargar la imagen](imagenesDemo/CatalogoFiltro.png)<br>
<br>
**Crear nuevo juego:**
![No se ha podido cargar la imagen](imagenesDemo/CatalogoNuevoJuego.png)<br>
<br>
**Edición juego:**
![No se ha podido cargar la imagen](imagenesDemo/EdicionJuego.png)<br>
<br>

**COMPONENTE CATEGORÍAS:**<br>
**Categorías:**
![No se ha podido cargar la imagen](imagenesDemo/Categorias.png)<br>
<br>
**Nueva categoría:**
![No se ha podido cargar la imagen](imagenesDemo/NuevaCategoria.png)<br>
<br>
**Edición categoría:**
![No se ha podido cargar la imagen](imagenesDemo/EdicionCategoria.png)<br>
<br>

**COMPONENTE AUTORES:**<br>
**Autores:**
![No se ha podido cargar la imagen](imagenesDemo/Autores.png)<br>
<br>
**Nuevo autor:**
![No se ha podido cargar la imagen](imagenesDemo/NuevoAutor.png)<br>
<br>
**Edición autor:**
![No se ha podido cargar la imagen](imagenesDemo/EdicionAutor.png)<br>
<br>

**COMPONENTE LOGIN:**<br>
**Login:**
![No se ha podido cargar la imagen](imagenesDemo/Login.png)<br>
