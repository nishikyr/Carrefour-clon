import './ItemsPedido.css'
import { useState } from 'react'
import useGlobalStore from '../../../../globalState/storeGlobal';

//...por temas de mantenimiento mejor meterlo en directorio aparte....
const MiniProducto=( {producto, cantidad, setItemsPedido } )=>{
    
    const [cantidadMini, setCantidadMini]=useState(cantidad);

    return (
        <div className='container'>
            <div className="row">
                <div className="col-2">
                    <img src={ producto.imagenes[0] } alt='imagen producto' style={{ 'height':'80px', 'width':'80px'}}/>
                </div>

                <div className="col-5 d-flex flex-column align-items-center">
                    <h4><strong>{producto.nombre}</strong></h4>
                    <small>{producto.precio} € </small>
                    {
                        producto.precioKg && <small>precio/kg {producto.precioKg} € </small>
                    }
                </div>

                <div className="col-3 d-flex flex-row justify-content-end mt-4">
                    <div className='d-flex flex-row'>
                        <button className="btn btnCantidad " type="button"  onClick={ (ev)=> { setCantidadMini(cantidadMini - 1); setItemsPedido( cantidadMini == 1 ? 'borrarItem':'modificarItem', { producto, cantidad: cantidadMini} ); } } >-</button>
                        <label className="labelcantidad"> { cantidadMini || 1 }   </label>
                        <button className="btn btnCantidad" type="button" onClick={ (ev)=> { setCantidadMini(cantidadMini + 1); setItemsPedido('modificarItem',{ producto, cantidad: cantidadMini });  } }>+</button>
                    </div>
                    <div><button className="btn"  onClick={(ev)=> { setCantidadMini(0); setItemsPedido( 'borrarItem', { producto, cantidad: 0 } ); }}><i className="fa-solid fa-trash"></i></button></div>
                </div>

                <div className="col-2 d-flex flex-row align-items-center">
                    <h4><strong>{ Math.round ( producto.precio * cantidadMini * 100 ) / 100 }</strong></h4>
                </div>
            </div>
        </div>
    )

}



const ItemsPedido=()=>{

    const { pedido, setItemsPedido }=useGlobalStore();

    return (
        <div className='container'>
            <div className="row mt-4 mb-2">
                <div className="col d-flex flex-row align-items-start">
                    <h1>Mi Cesta ( { pedido.itemsPedido.length } productos )</h1>
                </div>
            </div>

            { 
                // nos creamos minicomponente para mostrar cada item del pedido: { producto: { _id....}, cantidad: ... }
                pedido.itemsPedido.map(
                    (el,pos)=> 
                        <div className="row" key={pos}>
                            <div className="col">
                                <MiniProducto producto={el.producto} cantidad={el.cantidad} setItemsPedido={setItemsPedido}></MiniProducto>
                            </div>
                        </div>

                )
            }
        </div>
    )
};

export default ItemsPedido;