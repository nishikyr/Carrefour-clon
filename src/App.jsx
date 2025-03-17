import { useState } from 'react'
import './App.css'
import Registro from './components/zonaCliente/registroComponent/Registro'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' // funcion del paquete React-router-dom que admite como parametro un array de objetos RouteObject que mapean URLS obtenida del navegador con componentes a cargar.
//Propiedades de este objetos: path:  <------ url que chequea el modulo de enrutamiento con la url navegador
//                            element: <----- componente a cargar si se encuentra la url en path:
//                            children: <---- array de objetos route HIJOS para este path(anidar rutas)
const routerObject = createBrowserRouter(
  [
    {
      path: '/Cliente',
      children: [
        {path: 'Registro', element: <Registro></Registro>}
      ]
    }
  ]
)


function App() {

  return (
    <>
      <RouterProvider router={routerObject}></RouterProvider>
    </>
    
  )
}

export default App
