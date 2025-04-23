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
            setJwt: (tipo, valorjwt) => set (state => ({...state, jwt: { ...state.jwt, [tipo]: valorjwt } } ) ), //se le pone ese corchete porque ese será el parametro que yo le voy a pasar. Para que lo entiendas esta en el Registro.jsx
            setDatosCliente: newdatosCliente => (set (state => ({...state, datosCliente: {...state.datosCliente, ...newdatosCliente } } ) ) ) //Esto lo que me hace es actualizarle y/o añadir las propiedas en caso no los tenga. Por eso es que lo paso con ...newdatosCliente, para que no me borre las propiedas en caso que no tenga lo anterior
        }
    }
);

export default useGlobalStore;