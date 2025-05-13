import './Pedido.css'
import { useState, Fragment } from 'react' 
import { useNavigate } from 'react-router-dom'

import ItemsPedido from './stage-1-ItemsPedidoComponent/ItemsPedido'
import DatosContacto from './stage-2-DatosContactoComponent/DatosContacto'
import FechaEntrega from './stage-3-FechaEntregaComponent/FechaEntrega'
import Pago from './stage-4-PagoComponent/Pago'

import useGlobalStore from '../../../globalState/storeGlobal'

const Pedido=()=>{

    const navigate=useNavigate();

    const stages=[
        { stage: 1, nombre:'Mi Cesta', component: <ItemsPedido></ItemsPedido>},
        { stage: 2, nombre:'Datos de contacto', component: <DatosContacto></DatosContacto>},
        { stage: 3, nombre:'Entrega y Horario', component: <FechaEntrega></FechaEntrega>},
        { stage: 4, nombre:'Pago', component: <Pago></Pago>},

    ]
    const [stageActual, setStageActual]=useState(1);
    const { pedido, setItemsPedido } = useGlobalStore();
    
    return (
        <div class='container'>
            {/* fila del contenedor para icono y barra navegacion entre stages*/}
            <div className="row mt-4 mb-2">
                <div className="col-2">
                    <img src="/public/images/logo_carrefour.png" style={{'width':'165px', 'height':'50px', 'cursor':'pointer'}} onClick={ ev => navigate('/')}  />
                </div>
                <div className="col-10 d-flex flex-row justify-content-between">
                    {
                        stages.map( el => <Fragment key={el.stage}>                        
                                            <div className='d-flex flex-column align-items-center' >
                                                <span className='backnumbers'  style={{ 'background': el.stage==stageActual   ? '#4674b4': '#929292' }}>{el.stage}</span>
                                                <span style={{'color': el.stage==stageActual ? '#4674b4' : '#929292' }} onClick={ (ev)=> setStageActual(el.stage) }  className='nombresStage'>{el.nombre}</span>
                                            </div>
                                            {el.stage !== 4 && <div className='line' ></div>}
                                         </Fragment>
                                    )
                    }
                </div>
            </div>

            {/* fila del contenedor para mostrar componente en funcion del stageActual y resumen pedido: subtotal, total...*/}
            <div className="row mt-2 mb-2">
                
                <div className="col-9">
                    { stages[stageActual - 1].component }
                </div>

                <div className="col-3">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex flex-row justify-content-between">
                                <h4><strong>Subtotal:</strong></h4>
                                <div>{pedido.subtotal} €</div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col d-flex flex-row justify-content-between">
                                <div><small>Descuentos y cupones</small></div>
                                <div><small>0 €</small></div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col d-flex flex-row justify-content-between">
                                <div>Gastos de envio</div>
                                <div>{pedido.gastosEnvio} €</div>
                            </div>
                        </div>

                        <hr></hr>

                        <div className="row">
                            <div className="col d-flex flex-row justify-content-between">
                                <div><h4><strong>TOTAL A PAGAR</strong></h4></div>
                                <div><h4><strong>{pedido.total} €</strong></h4></div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col align-items-center">
                                <button className="btn btn-primary btn-lg" onClick={(ev)=>setStageActual(stageActual + 1)}>
                                    { 'continuar a ' + stages[stageActual].nombre.toLocaleLowerCase() }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Pedido;