import './ListaProductos.css'
import { use } from 'react';
import MiniProducto from './miniProductoComponent/MiniProducto';

const ListaProductos=( {productosPromise} )=>{
    //con la funcion use de react obtengo los datos asincronos pasados como propiedad desde comp. padre
    const productos = use(productosPromise)
    return(
        <div className="container">
            <div className="row">
                {productos.map((producto, index) => (
                <div className="col-6 col-md-4 col-lg-3 mb-4 m" key={index}>
                    <MiniProducto producto={producto} />
                </div>
                ))}
            </div>
        </div>
    )
}

export default ListaProductos;