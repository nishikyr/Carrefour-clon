import { useParams } from "react-router-dom";
import restClienteService from "../../../services/restClienteService";
import { Suspense } from "react";
import ListaProductos from "./listaProductosComponent/ListaProductos";
//Para la recuperacion de los produtos, podemos usar un loader ... pero vamos a utilizar la nueva funcion api: use
//Se usa en conjuncion con el componente <Suspense ... />
const Productos = () => {
    // extrae en objeto paramtros o segmentos variables de url carga componente: /Tienda/Productos/:nombre/:pathCat
    const { pathCat } =useParams();     //!Pero este caso solo tenemos una propiedad, y es pathcat.
    

    return (
        <div className="container mt-4">
            {/*Lista de productos */}
            <div className="row">
                <div className="col-md-2">Filtros ...</div>
                <div className="col-md-10">
                    <Suspense fallback={<h4>.. Cargando productos ...</h4>}>
                        <ListaProductos productosPromise={restClienteService.Productos(pathCat)}></ListaProductos>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default Productos;