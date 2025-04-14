import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import MiniNavbarRegistro from "./mini-navbarRegistroComponent/mini-navbarRegistro";
import MiniFooterRegistro from "./mini-footerRegistroComponent/mini-footerRegistro";
import "./Registro.css";
import restClienteService from "../../../services/restClienteService";
import { useNavigate } from "react-router-dom";
import useGlobalStore from "../../../globalState/storeGlobal";

function Registro(){

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [formularioValido, setFormularioValido] = useState(false);
    const navigate = useNavigate();
    
    //State-global desde zustand...
    //const stateGlobal=useGlobalStore();
    //ahora personalizado
    //console.log('objeto del state-global almacenado en zustand...', stateGlobal);
    const {setJwt, setCodigoVerificacion, setDatosCliente } = useGlobalStore();
    //-------------------------------------------------------------------
    
    //===== TODOS LOS DATOS DEL FORMULARIO MAPEADOS ...
    const [formData, setFormData]=useState(
        {
            nombre:{
                valor:'',
                valido: false,
                validaciones:{ // <-- propiedad de "nombre" con las validaciones a hacer sobre el input-nombre
                    obligatorio: [ true, '* Nombre obligatorio'],
                    maximaLongitud: [ 150, '* Nombre no debe exceder de 150 cars.'],
                    patron: [ /^([A-Z][a-z]+\s*)+/, '* Formato invalido nombre, ej: Nuria Roca']
                },
                mensajeValidacion:''
            },
            apellidos:{
                valor:'', 
                valido: false,
                validaciones:{ 
                    obligatorio: [ true, '* Apellidos obligatorios'],
                    maximaLongitud: [ 250, '* Apellidos no debe exceder de 250 cars.'],
                    patron: [ /^([A-Z][a-z]+\s*)+/, '* Formato invalido apellidos, ej: Nishiky Ruales']
                },
                mensajeValidacion:''
            },
            telefono:{
                valor: '',
                valido: false,
                validaciones:{
                    obligatorio: [true, '* Teléfono obligatorio'],
                    longitudExacta: [9, '* El teléfono debe tener 9 dígitos'],
                    patron: [/^\d{9}$/, '* Formato inválido, solo se permiten 9 dígitos']
                },
                mensajeValidacion:''
            },
            tipoDocumento: {
                valor: 'DNI',
                valido: true,
                validaciones: {
                    obligatorio: [true, '* Tipo de documento obligatorio'],
                    opcionesValidas: [['DNI', 'NIE', 'Pasaporte'], '* Documento inválido, elija entre DNI, NIE o Pasaporte']
                },
                mensajeValidacion: ''
            },
            numeroDocumento: {
                valor: '',
                valido: false,
                validaciones: {
                    obligatorio: [true, '* Número de documento obligatorio'],
                    formatoDNI: [/^\d{8}[A-Z]$/, '* Formato DNI inválido, ej: 12345678A'],
                    formatoNIE: [/^[XYZ]\d{7}[A-Z]$/, '* Formato NIE inválido, ej: X1234567A'],
                    formatoPasaporte: [/^[A-Z0-9]{6,9}$/, '* Formato Pasaporte inválido, ej: A1234567']
                },
                mensajeValidacion: ''
            },
            email:{
                valor:'', 
                valido: false,
                validaciones:{ 
                    obligatorio: [ true, '* Email obligatorios'],
                    patron: [ /^.+@(hotmail|gmail|yahoo|msn)\.[a-z]{2,3}$/, '* Formato invalido email, ej: mio@hotmail.es']
                },
                mensajeValidacion:''
            },
            password:{
                valor:'', 
                valido: false,
                validaciones:{ 
                    obligatorio: [ true, '* Contraseña obligatoria'],
                    minimaLongitud: [ 8, '* La contraseña debe tener al menos 8 caracteres '],
                    patron: [ /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%*]).{8,}$/ , '* Formato invalido contraseña, una MAYS, una Mins, un digito, un simbolo']
                },
                mensajeValidacion:''
            },
            password2:{
                valor:'', 
                valido: false,
                validaciones: { 
                    obligatorio: [true, '* Debes repetir la contraseña'],
                    coincidir: ['password', '* Las contraseñas no coinciden']
                },
                mensajeValidacion:''
            },
            postalCode:{
                valor: '',
                valido: false,
                validaciones: {
                    obligatorio: [false, '* Código postal opcional'],
                    longitudExacta: [5, '* El código postal debe tener 5 dígitos'],
                    patron: [/^\d{5}$/, '* Formato inválido, debe ser un código postal de 5 dígitos']
                },
                mensajeValidacion: ''
            }
        }
    );

    async function ManejarSubmitForm(ev){
        ev.preventDefault();

        console.log("Pasa por esta funcion!!!!!")
        console.log(formData);
        //Vamos a transformar esto:
        const datosParaServer = {
            nombre: formData.nombre.valor,
            apellidos: formData.apellidos.valor,
            telefono: formData.telefono.valor,
            tipoDocumento: formData.tipoDocumento.valor,
            numeroDocumento: formData.numeroDocumento.valor,
            email: formData.email.valor,
            password: formData.password.valor,
            cp: formData.postalCode.valor
        }

        //Como le pones un await aqui, arriba a la funcion le debes cambiar a un async para que se cumpla el patrón async/await
        const _respRegistro = await restClienteService.LoginRegistro('Registro', datosParaServer);
        if(_respRegistro.codigo === 0){
            //Entonces necesito almacenar en STATE-GLOBAL datos del codigo de verificacion, jwt verificacion ...
            //usamos zustand
            setCodigoVerificacion(_respRegistro.datos.codigo);
            setJwt('verificacion', _respRegistro.datos.jwtVerificacion);
            setDatosCliente({cuenta: {email: _respRegistro.datos.email } } );
            navigate('/Cliente/Verificar/Registro');
            
        }else{
            //FALLO AL REGISTRAR AL USUARIO.
            alert('Fallo en el registro. Intenta nuevamente')
        }

        ///#region ------------- YO LO HICE ASI, PERO EL PROFE LO HIZO CON OTRA FORMA ----------------------
        // restClienteService.RegistrarDatosCliente(
        //     {
        //         nombre: formData.nombre.valor,
        //         apellidos: formData.apellidos.valor,
        //         telefono: formData.telefono.valor,
        //         tipoDocumento: formData.tipoDocumento.valor,
        //         numeroDocumento: formData.numeroDocumento.valor,
        //         email: formData.email.valor,
        //         password: formData.password.valor,
        //         codigo: formData.postalCode.valor
        //         //Como esto es opcional puede llegar vacio entonces lo paso a null para guardarlo en mi mongoDB
        //     }
        // ).then(response => {
        //     if(response.codigo === 0 ){
        //         localStorage.setItem('jwtVerificacion', response.datos.jwtVerificacion);
        //         localStorage.setItem('emailRegistro', formData.email.valor);
        //         //necesito almacenar en STATE-GLOBAL datos del codigo de verificacion, jwt verificacion ....
        //         //usamos zustand
        //         setCodigoVerificacion(response.datos.codigo);
        //         setJwt('verificacion', response.datos.)

        //         //Esto me va redigir a la página de comprobación 
        //         navigate('/Cliente/Verificar/Registro');
        //     }else{
        //         console.log('paso bien pero hubo errores!!!!!!!!!!! :(')
        //     }
        // }).catch(error => {
        //     console.log('Error al registrar el usuario: ', error);
        // })
        //#endregion-----------------------------------------------------------------------------------------
        
    }

    function ValidarCajasHandler(ev){
        console.log("Se ha perdido el foco de la caja con el valor ...", ev.target.name, ev.target.value);
        let _validacionesAHacer=formData[ev.target.name].validaciones;
        let _valido = false;
        let _errorMensaje='';

        for(const validacion of Object.keys(_validacionesAHacer)){
            switch(validacion){
                case 'obligatorio':
                    _valido = ev.target.value.trim() !== '' ? true: false;
                    break;

                case 'maximaLongitud':
                    _valido = ev.target.value.trim() !== '' && ev.target.value.length < _validacionesAHacer[validacion][0] ? true : false;
                    break;

                case 'minimaLongitud':
                    _valido=ev.target.value.trim() !== '' && ev.target.value.length >= _validacionesAHacer[validacion][0] ? true : false;                                
                    break;

                case 'patron':
                    _valido=new RegExp(_validacionesAHacer[validacion][0]).test(ev.target.value) ? true : false;                        
                    break;
                
                case 'longitudExacta':
                    _valido=ev.target.value.trim() !== '' && ev.target.value.length == _validacionesAHacer[validacion][0] ? true : false;
                    break;
                
                case 'opcionesValidas':
                    _valido=ev.target.value == _validacionesAHacer[validacion][0][0] ||
                            ev.target.value == _validacionesAHacer[validacion][0][1] ||
                            ev.target.value == _validacionesAHacer[validacion][0][2] ? true : false;
                    break;

                case 'formatoDNI':
                    if (formData.tipoDocumento.valor !== 'DNI'){
                        break;
                    } 
                    _valido = new RegExp(_validacionesAHacer[validacion][0]).test(ev.target.value);
                    if (!_valido) _errorMensaje = _validacionesAHacer[validacion][1];
                    break; // 💡 Detiene la ejecución aquí si es DNI
        
                case 'formatoNIE':
                    if (formData.tipoDocumento.valor !== 'NIE') break;
                    _valido = new RegExp(_validacionesAHacer[validacion][0]).test(ev.target.value);
                    if (!_valido) _errorMensaje = _validacionesAHacer[validacion][1];
                    break; // 💡 Detiene la ejecución aquí si es NIE
                        
                case 'formatoPasaporte':
                    if (formData.tipoDocumento.valor !== 'Pasaporte') break;
                    _valido = new RegExp(_validacionesAHacer[validacion][0]).test(ev.target.value);
                    if (!_valido) _errorMensaje = _validacionesAHacer[validacion][1];
                    break; // 💡 Detiene la ejecución aquí si es Pasaporte


                case 'coincidir':
                    _valido = ev.target.value === formData[_validacionesAHacer[validacion][0]].valor ? true : false;
                    break;

                default:
                    break;
            };
            if (! _valido) { 
                _errorMensaje= _validacionesAHacer[validacion][1]; 
                break; 
            }
        }

        setFormData((prevFormData) => {
            const nuevoFormData = {
                ...prevFormData,
                [ev.target.name]: {
                    ...prevFormData[ev.target.name],
                    valido: _valido,
                    mensajeValidacion: _errorMensaje
                }
            };
        
            // Verifica si TODOS los campos son válidos y actualiza formularioValido
            let camposValidos = true;
            for(let campo in nuevoFormData){
                if (campo === 'postalCode' && !nuevoFormData[campo].valor) continue;
                if(!nuevoFormData[campo].valido){
                    camposValidos = false;
                    break;
                }
            }
            setFormularioValido(camposValidos);
        
            return nuevoFormData;
        });
        
    }
    
    return (
        <>
        <MiniNavbarRegistro />
        
        <div className="container registro-container">
            <div className="text-center">
                <h3 className="mt-4 fw-bold">Crea tu cuenta</h3>
            </div>
            <form className="mt-4" onSubmit={ManejarSubmitForm}>
                <div className="form-floating mb-3">
                    <input type="text" 
                        className="form-control rounded-3" 
                        id="nombre" 
                        name="nombre" 
                        placeholder="Nombre*" required
                        onChange={ (ev)=> setFormData( {...formData, nombre:{ ...formData.nombre, valor: ev.target.value } } ) }
                        onBlur={ValidarCajasHandler}
                    />
                    { ! formData.nombre.valido && <span className='text-danger text-start d-block'>{formData.nombre.mensajeValidacion}</span> }
                    <label htmlFor="nombre">Nombre*</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" 
                        className="form-control rounded-3" 
                        id="apellidos" 
                        name="apellidos" 
                        placeholder="Apellidos*" required 
                        onChange={ (ev)=> setFormData( {...formData, apellidos:{ ...formData.apellidos, valor: ev.target.value } } ) }
                        onBlur={ValidarCajasHandler}
                    />
                    { ! formData.apellidos.valido && <span className='text-danger text-start d-block'>{formData.apellidos.mensajeValidacion}</span> }
                    <label htmlFor="apellidos">Apellidos*</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="tel" 
                        className="form-control rounded-3" 
                        id="telefono" 
                        name="telefono" 
                        placeholder="Teléfono*" required
                        inputMode="numeric"
                        onChange={ (ev)=> setFormData( {...formData, telefono:{ ...formData.telefono, valor: ev.target.value } } ) }
                        onBlur={ValidarCajasHandler}
                    />
                    { ! formData.telefono.valido && <span className='text-danger text-start d-block'>{formData.telefono.mensajeValidacion}</span> }
                    <label htmlFor="telefono">Teléfono*</label>
                </div>
                <div className="mb-3 d-flex">
                    <div className="form-floating flex-grow-1 me-2">
                        <select className="form-select rounded-3" 
                                id="documentoTipo" 
                                name="tipoDocumento"
                                value={formData.tipoDocumento.valor}
                                onChange={(ev) => setFormData({...formData, tipoDocumento:{...formData.tipoDocumento, valor: ev.target.value}})}
                        >
                            <option value="DNI">DNI</option>
                            <option value="NIE">NIE</option>
                            <option value="Pasaporte">Pasaporte</option>
                        </select>
                        <label htmlFor="documentoTipo">Tipo de documento*</label>
                    </div>
                    <div className="form-floating flex-grow-1">
                    <input 
                        type="text" 
                        className="form-control rounded-3" 
                        id="numeroDocumento" 
                        name="numeroDocumento" 
                        placeholder="Número de documento*" 
                        required 
                        onChange={ (ev)=> setFormData( {...formData, numeroDocumento:{ ...formData.numeroDocumento, valor: ev.target.value } } ) }
                        onBlur={ValidarCajasHandler}
                    />
                        { ! formData.numeroDocumento.valido && <span className='text-danger text-start d-block'>{formData.numeroDocumento.mensajeValidacion}</span> }
                        <label htmlFor="documentoNumero">Número de documento*</label>
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" 
                            className="form-control rounded-3" 
                            id="email" 
                            name="email" 
                            placeholder="Correo electrónico*" required 
                            onChange={ (ev)=> setFormData( {...formData, email:{ ...formData.email, valor: ev.target.value } } ) }
                            onBlur={ValidarCajasHandler}
                    />
                    { ! formData.email.valido && <span className='text-danger text-start d-block'>{formData.email.mensajeValidacion}</span> }
                    <label htmlFor="email">Correo electrónico*</label>
                </div>
                <div className="form-floating mb-3 position-relative">
                    <input
                        type={showPassword1 ? "text" : "password"}
                        className="form-control rounded-3"
                        id="password"
                        name="password"
                        placeholder="Contraseña*" required
                        onChange={(ev) => setFormData({...formData, password: {...formData.password, valor: ev.target.value } } ) }
                        onBlur={ValidarCajasHandler}
                    />
                    { !formData.password.valido && <span className='text-danger text-start d-block'>{formData.password.mensajeValidacion}</span> }
                    <label htmlFor="password">Contraseña*</label>
                    <span
                        className="position-absolute end-0 top-50 translate-middle-y me-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword1(!showPassword1)}
                    >
                        {showPassword1 ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </span>
                </div>

                <div className="form-floating mb-3 position-relative">
                    <input
                        type={showPassword2 ? "text" : "password"}
                        className="form-control rounded-3"
                        id="password2"
                        name="password2"
                        placeholder="Repite la Contraseña*" required
                        onChange={(ev) => setFormData({...formData, password2: {...formData.password2, valor: ev.target.value } } ) }
                        onBlur={ValidarCajasHandler}
                    />
                    { !formData.password2.valido && <span className='text-danger text-start d-block'>{formData.password2.mensajeValidacion}</span> }
                    <label htmlFor="password2">Repite la Contraseña*</label>
                    <span
                        className="position-absolute end-0 top-50 translate-middle-y me-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword2(!showPassword2)}
                    >
                        {showPassword2 ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </span>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" 
                            className="form-control rounded-3" 
                            id="postalCode" 
                            name="postalCode" 
                            placeholder="Código postal (opcional)" 
                            onChange={(ev) => setFormData({...formData, postalCode: {...formData.postalCode, valor: ev.target.value } } ) }
                            onBlur={ValidarCajasHandler}
                    />
                    <label htmlFor="postalCode">Código postal (opcional)</label>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-3 fs-5 rounded-3"
                    disabled={!formularioValido}
                    >Crear cuenta</button>
            </form>
            <div className="text-center mt-3">
                <p>¿Ya tienes una cuenta? <a href="#" className="text-primary">Iniciar sesión</a></p>
                <small>
                    Al crear una cuenta, aceptas nuestras <a href="#" className="text-primary">Política de privacidad</a> y <a href="#" className="text-primary">Términos y condiciones</a>.
                </small>
            </div>
        </div>

        <MiniFooterRegistro />
        </>

    );
}

export default Registro;