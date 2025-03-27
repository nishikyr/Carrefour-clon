import {create} from 'zustand';

//La funcion 'create' de zustand devuelve un HOOK que pueden usar los componentes para recuperar/modificar el objeto
//metido en el STATE-GLOBAL definido dentro de la funcion 'create'

const useGlobalStore=create(
    (set, get, store) => {
        console.log('Parametros que recibe la funcion son: ', set, get, store);
        return {
            codigoVerificacion: '',
            jwt: { session: '', refresh: '', verificacion: ''},
            datosCliente: { },
            //funciones modificacion de props. objeto STATE GLOBAL, NO PUEDEN MUTARLO!!!! ESTO NO VALDRIA:
            //setCodigoVerificacion: codigo => set( state => state.codigoVerificacion=codigo)
            //Tienes que sustituir el objeto state por una copia con el valor de la propiedad modificada
            setCodigoVerificacion: codigo => set( state => ({...state, codigoVerificacion: codigo } ) ),
            setJwt: (tipo, valorjwt) => set (state => ({...state, jwt: { ...state.jwt, [tipo]: valorjwt } } ) ),
            setDatosCliente: newdatosCliente => (set (state => ({...state, datosCliente: {...state.datosCliente, ...newdatosCliente } } ) ) )
        }
    }
);

export default useGlobalStore;