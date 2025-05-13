const clienteSlice=(set, get, store) => {

    console.log("Estamos en clienteSlice ... parametros recibidos desde modulo central sotreGlobal.js ...", set, get, store);
    return {
            codigoVerificacion: '',
            jwt: { session: '', refresh: '', verificacion: ''},
            datosCliente: { },
            setCodigoVerificacion: codigo => set( state => ({...state, codigoVerificacion: codigo } ) ),
            setJwt: (tipo, valorjwt) => set (state => ({...state, jwt: { ...state.jwt, [tipo]: valorjwt } } ) ),
            setDatosCliente: newdatosCliente => (set (state => ({...state, datosCliente: {...state.datosCliente, ...newdatosCliente } } ) ) )
    }
}

export default clienteSlice;