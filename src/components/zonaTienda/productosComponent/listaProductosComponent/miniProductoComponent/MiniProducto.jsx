import './MiniProducto.css'
import { useState } from 'react'
import useGlobalStore from '../../../../../globalState/storeGlobal';

const MiniProducto=({producto})=>{
    const { pedido, setItemsPedido }=useGlobalStore();
    const [ cantidad, setCantidad ]=useState( pedido.itemsPedido.find( it => it.producto._id == producto._id)?.cantidad || 0 );


    return (
            <div className="card" style={{"width": "18rem"}}>
                <img src={ producto.imagenes[0] }  className="card-img-top" style={{"height": "170px", "width": "170px"}} alt="..."/>
                <div className="card-body">
                <h3 className="card-title">{ producto.precio } €</h3>
                <h5 className="card-text text-body-secondary">{ producto.precioKg } €/Kg</h5>
                <p className="card-text"><strong>{ producto.nombre }</strong></p>
                {/* 
                    si el producto no existe en el pedido, la cantidad es 0 se muestra boton AÑADIR en caso contrario
                    se muestra boton -,+ y papelera con un input-text para meter solo cantidades de 2 cifras (nada de caracteres)
                */}
                {
                    cantidad == 0 ? 
                    (
                        <button type="button" className="btn btn-primary" onClick={ (ev)=>{ setCantidad(cantidad + 1); setItemsPedido('addItem', { producto, cantidad:1} ); } }>Añadir</button>
                    )
                    :
                    (
                        <div className='input-group input-group-sm'>
                            <button type='button' className='btn btn-primary btn-sm' onClick={ (ev)=> { setCantidad(cantidad - 1); setItemsPedido( cantidad == 1 ? 'borrarItem':'modificarItem', { producto, cantidad} ); } }>
                                { cantidad == 1 ? <i className='fa-solid fa-trash' style={{'color':'white'}}></i> : '-' }
                            </button>
                            <input type='text' className='form-control'
                                    maxLength='2'
                                    value={cantidad}
                                    onChange={(ev)=> { ev.target.value !== '' ? setCantidad(parseInt(ev.target.value)) : setCantidad(1);  }}
                                    onKeyDown={(ev)=> { console.log('has pulsado...', ev.key ); /^(\d|Backspace)$/.test(ev.key) ? true : ev.preventDefault(); } }
                                    onBlur={ (ev)=> { setCantidad(parseInt(ev.target.value)); setItemsPedido('modificarItem', {producto,cantidad} ); } }        
                            />
                            <button type='button' className='btn btn-primary btn-sm' onClick={ (ev)=> { setCantidad(cantidad + 1); setItemsPedido('modificarItem',{ producto, cantidad });  } }>+</button>
                        </div>
                    )
                }
                </div>
            </div>
    )
}

export default MiniProducto;