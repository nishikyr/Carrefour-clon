import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import MiniNavbarRegistro from "./mini-navbarRegistroComponent/mini-navbarRegistro";
import MiniFooterRegistro from "./mini-footerRegistroComponent/mini-footerRegistro";
import "./Registro.css";


function Registro(){
    
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

    function ManejarSubmitForm(ev){
        ev.preventDefault();
        console.log("Pasa por esta funcion!!!!!")
    }

    function ValidarCajasHandler(ev){
        let _validacionesAHacer=formData[ev.target.name].validaciones;
        let _valido = false;
        let _errorMensaje='';

        for(const vali of Object.keys(_validacionesAHacer)){
            switch(vali){
                case 'obligatorio':
                    _valido = ev.target.value.trim() !== '' ? true: false;
                    break;

                case 'maximaLongitud':
                    _valido = ev.target.value.trim() !== '' && ev.target.value.length < _validacionesAHacer[vali][0] ? true : false;
                    break;

                case 'minimaLongitud':
                    _valido=ev.target.value.trim() !== '' && ev.target.value.length >= _validacionesAHacer[vali][0] ? true : false;                                
                    break;

                case 'patron':
                    _valido=new RegExp(_validacionesAHacer[vali][0]).test(ev.target.value) ? true : false;                        
                    break;
                
                case 'longitudExacta':
                    _valido=ev.target.value.trim() !== '' && ev.target.value.length == _validacionesAHacer[vali][0] ? true : false;
                    break;
                
                case 'opcionesValidas':
                    _valido=ev.target.value == _validacionesAHacer[vali][0][0] ||
                            ev.target.value == _validacionesAHacer[vali][0][1] ||
                            ev.target.value == _validacionesAHacer[vali][0][2] ? true : false;
                    break;

                case 'formatoNIE':
                    _valido=new RegExp(_validacionesAHacer[vali][0]).test(ev.target.value) ? true : false;                        
                    break;

                case 'formatoDNI':
                    _valido=new RegExp(_validacionesAHacer[vali][0]).test(ev.target.value) ? true : false;                        
                    break;

                case 'formatoPasaporte':
                    _valido=new RegExp(_validacionesAHacer[vali][0]).test(ev.target.value) ? true : false;                        
                    break;

                default:
                    break;
            };
            if (! _valido) { _errorMensaje= _validacionesAHacer[vali][1]; break; }
        }
        setFormData(
            {
                ...formData,
                [ev.target.name]: {
                                    ...formData[ev.target.name],
                                    valido: _valido,
                                    mensajeValidacion: _errorMensaje
                                }
            }
        )
    }

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

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
                                name="documentoTipo"
                                
                        >
                            <option value="DNI">DNI</option>
                            <option value="NIE">NIE</option>
                            <option value="Pasaporte">Pasaporte</option>
                        </select>
                        <label htmlFor="documentoTipo">Tipo de documento*</label>
                    </div>
                    <div className="form-floating flex-grow-1">
                        <input type="text" className="form-control rounded-3" id="documentoNumero" name="documentoNumero" placeholder="12345679A*" required />
                        <label htmlFor="documentoNumero">Número de documento*</label>
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control rounded-3" id="email" name="email" placeholder="Correo electrónico*" required />
                    <label htmlFor="email">Correo electrónico*</label>
                </div>
                <div className="form-floating mb-3 position-relative">
                    <input
                        type={showPassword1 ? "text" : "password"}
                        className="form-control rounded-3"
                        id="password"
                        name="password"
                        placeholder="Contraseña*"
                        required
                    />
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
                        placeholder="Repite la Contraseña*"
                        required
                    />
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
                    <input type="text" className="form-control rounded-3" id="postalCode" name="postalCode" placeholder="Código postal (opcional)" />
                    <label htmlFor="postalCode">Código postal (opcional)</label>
                </div>
                <button type="submit" className="btn btn-primary w-100 py-3 fs-5 rounded-3">Crear cuenta</button>
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