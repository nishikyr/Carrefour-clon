import { useEffect, useState } from 'react';
import './Verficar2FAcode.css'
import { useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Verficar2FAcode=()=>{

    const { operacion }=useParams();  //<-------devuelve un objeto con este formato: {nombre_parametro: valor, nombre_parametro:valor, ... } en nuestro caso: { operacion: 'Registro' | 'Login'}

    const [emailUsuario, setEmailUsuario] = useState('');
    // Para colocar el email del usuario
    useEffect( (ev) => {
        const email = localStorage.getItem('emailRegistro');
        setEmailUsuario(email);
    });

    const navigate = useNavigate();
    //Función para comprobar el código !!!!!!!!!!! al hacer click en el boton
    const ManejarValidacionCodigo = () => {
        const codigoIngresado = 
            [1, 2, 3, 4, 5, 6]
            .map(i => document.getElementById('code' + i).value)
            .join('');
    
        const jwt = localStorage.getItem('jwtVerificacion');
        const email = localStorage.getItem('emailRegistro');
    
        if (codigoIngresado.length < 6 || codigoIngresado === null) {
            alert('Debes ingresar los 6 dígitos del código.');
            return;
        }
    
        fetch('http://localhost:3003/api/zonaCliente/ActivarCuenta', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify(
                { 
                    codigo: codigoIngresado,
                    email: email
                }
            )
        })
        .then(res => res.json())
        .then(data => {
            if (data.codigo === 0) {
                alert('Cuenta verificada correctamente. ¡Ya puedes iniciar sesión!');
                localStorage.removeItem('jwtVerificacion');
                localStorage.removeItem('emailRegistro');
                // Redirigir al login si quieres
                navigate('/Cliente/Login');
            } else {
                alert('Código incorrecto o expirado.');
            }
        })
        .catch(err => {
            console.error('Error al validar el código:', err);
            alert('Error en la validación del código.');
        });
    };




    return (
            <div className="container">
                <div className="row m-2">
                    <div className="col-md-2"></div>
                    <div className="col-md-6">
                        <div className="d-flex flex-column  text-center">
                            <picture><img src="https://www.carrefour.es/nlogin/img/v3/otpMail.svg" style={{"width": "96px", "height": "96px"}}/></picture>
                            <h4 className="text-title">{ operacion == 'Registro' ? 'Revista tu Email':'Confirma tu código' }</h4>
                            <p>{ operacion=='Registro' ? 'Para verificar tu cuenta introduce el código que te hemos' : 'Por tu seguridad, introduce el código que te hemos' }<br/> enviado a:</p>
                            <p id="otpSended" className="font-weight-600">{emailUsuario}</p>
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
                        <button type="button" className="botonValidar" onClick={ManejarValidacionCodigo}>Validar codigo</button>
                    </div>
                </div>
            </div>   

    )
}

export default Verficar2FAcode;