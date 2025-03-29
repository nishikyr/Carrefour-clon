import { useEffect, useState } from 'react';
import './Verficar2FAcode.css'
import { useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useGlobalStore from '../../../globalState/storeGlobal';
import restClienteService from '../../../services/restClienteService';

const Verficar2FAcode=()=>{

    const { operacion }=useParams();  //<-------devuelve un objeto con este formato: {nombre_parametro: valor, nombre_parametro:valor, ... } en nuestro caso: { operacion: 'Registro' | 'Login'

    // Zustand - estado global
    const { jwt, datosCliente } = useGlobalStore();

    const navigate = useNavigate();

    const [charsCode, setCharsCode] = useState([]); //<--------- array de caracteres de codgio por posicion de cajitas de texto [] [] [] []

    //Para ver si el usuario ha cambiado algo en las casillas ...  
    const manejarCambioDigito = (ev, pos) => {
        const nuevoValor = ev.target.value.slice(-1);
        setCharsCode((prev) => {
            const copia = [...prev];
            copia[pos] = nuevoValor;
            return copia;
        });
    }
    
    //Función para comprobar el código !!!!!!!!!!! al hacer click en el boton
    async function ValidarCodigo() {
        console.log('Lo que vale el array del state....', charsCode);

        const codigo = charsCode.join('')
        console.log(codigo);

        if(codigo.length < 6 || charsCode.includes('')){
            alert('Debes completar los 6 digitos');
            return;
        }

        const _respuesta = await restClienteService.ActivarCuenta(datosCliente, jwt, codigo);

        if(_respuesta.codigo === 0){
            navigate('/Cliente/Login');
        }else{
            console.log('NO TE HEMOS REDIRIGIDO MAJETE!!!!!!!')
            return;
        }

        // try{
        //     const response = await fetch('http://localhost:3003/api/zonaCliente/ActivarCuenta', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': 'Bearer ' + jwt.verificacion
        //         },
        //         body: JSON.stringify({
        //             email: datosCliente.cuenta?.email,
        //             codigo: codigo
        //         })
        //     });
        //     const data = await response.json();

        //     if (data.codigo === 0) {
        //         alert(' Cuenta verificada correctamente. ¡Ya puedes iniciar sesión!');
        //         navigate('/Cliente/Login');
        //     } else {
        //         alert('Código incorrecto o expirado.');
        //     }
        // }catch(error){
        //     console.error('Error al validar el código:', error);
        //     alert('Error de servidor al verificar el código.');
        // }
    };


    return (
            <div className="container">
                <div className="row m-2">
                    <div className="col-md-2"></div>
                    <div className="col-md-6">
                        <div className="d-flex flex-column  text-center">
                            <picture><img src="https://www.carrefour.es/nlogin/img/v3/otpMail.svg" style={{"width": "96px", "height": "96px"}}/></picture>
                            <h4 className="text-title">{ operacion == 'Registro' ? 'Revista tu Email':'Confirma tu código' }</h4>
                            <p>
                                { operacion=='Registro' ? 'Para verificar tu cuenta introduce el código que te hemos' : 'Por tu seguridad, introduce el código que te hemos' }<br/> enviado a:
                            </p>
                            <p id="otpSended" className="font-weight-600">
                                {datosCliente.cuenta?.email}
                            </p>
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
                            [1,2,3,4,5,6].map( (a,pos) => 
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
                                            key={a}
                                            onChange={(ev) =>  manejarCambioDigito(ev, pos)}
                                            />
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
                        <button type="button" className="botonValidar" onClick={ValidarCodigo}>Validar codigo</button>
                    </div>
                </div>
            </div>   

    )
}

export default Verficar2FAcode;