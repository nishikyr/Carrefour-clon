import './Verficar2FAcode.css'
import { useParams} from 'react-router-dom'

const Verficar2FAcode=()=>{

    const { operacion }=useParams();  //<-------devuelve un objeto con este formato: {nombre_parametro: valor, nombre_parametro:valor, ... } en nuestro caso: { operacion: 'Registro' | 'Login'}

    return (
            <div className="container">
                <div className="row m-2">
                    <div className="col-md-2"></div>
                    <div className="col-md-6">
                        <div className="d-flex flex-column  text-center">
                            <picture><img src="https://www.carrefour.es/nlogin/img/v3/otpMail.svg" style={{"width": "96px", "height": "96px"}}/></picture>
                            <h4 className="text-title">{ operacion == 'Registro' ? 'Revista tu Email':'Confirma tu código' }</h4>
                            <p>{ operacion=='Registro' ? 'Para verificar tu cuenta introduce el código que te hemos' : 'Por tu seguridad, introduce el código que te hemos' }<br/> enviado a:</p>
                            <p id="otpSended" className="font-weight-600">...email usuario...</p>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-md-2"></div>
                    <div className="col-md-6">
                        <p>Código de verificación:*</p>
                    </div>
                </div>

                <div className="row m-2">
                    <div className="col-md-2"></div>
                    <div className="col-md-6 d-flex flex-row justify-content-center">
                        {
                            [1,2,3,4,5,6].map( a => 
                                    (
                                    <input type="tel"
                                            id={'code'+ a}  
                                            name={'code'+ a}
                                            className="m-1 digito"
                                            aria-required="true" 
                                            minLength="1"
                                            maxLength="1"
                                            placeholder=""
                                            aria-invalid="false"
                                            key={a}/>
                                        )
                            )
                        }
                    </div>
                </div>

                <div className="row m-4">
                    <div className="col-md-2"></div>
                    <div className="col-md-6 ">            
                        <p style={{"backgroundColor": "#ECF3FD"}}><i className="fa-solid fa-circle-info" style={{"color":"#0970E6"}}></i>   Revisa tu carpeta de spam si el mensaje no <br/> aparece en tu bandeja de entrada</p>
                    </div>
                </div>

                <div className="row m-2">
                    <div className="col-md-2"></div>
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <button type="button" className="botonReenviar">Reenviar codigo</button>
                        <button type="button" className="botonValidar">Validar codigo</button>
                    </div>
                </div>
            </div>   

    )
}

export default Verficar2FAcode;