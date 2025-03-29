import { useState } from 'react'
import './App.css'
import Registro from './components/zonaCliente/registroComponent/Registro'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' // funcion del paquete React-router-dom que admite como parametro un array de objetos RouteObject que mapean URLS obtenida del navegador con componentes a cargar.
import Login from './components/zonaCliente/loginComponent/Login'
import Verficar2FAcode from './components/zonaCliente/verificar2FAComponent/Verificar2FAcode'
import Layout from './components/zonaTienda/layOutComponent/Layout'
import Home from './components/zonaTienda/homeComponent/Home'

//Propiedades de este objetos: path:  <------ url que chequea el modulo de enrutamiento con la url navegador
//                            element: <----- componente a cargar si se encuentra la url en path:
//                            children: <---- array de objetos route HIJOS para este path(anidar rutas)
const routerObject = createBrowserRouter(
  [
    {
      element: <Layout />,
        children:[
          { path:'/', element: <Home/> },

        ]
    },
    {
      path: '/Cliente',
      children: [
        {path: 'Registro', element: <Registro></Registro>},
        {path: 'Login', element: <Login></Login>},
        {path: 'Verificar/:operacion', element: <Verficar2FAcode />}
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
