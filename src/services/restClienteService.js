import autoRefresh from "./autoRefresh";

export default{
    //#region----------------------------------------------------------
    ComprobarEmail: async function(email){
        try {
            const _respuesta = await fetch('http://localhost:3003/api/zonaCliente/ComprobarEmail', {
                method: "POST",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({email})
            });
            return _respuesta.json().codigo === 0;

        } catch (error) {
            console.log('Error al comprobar si existe email', error)
            return false;
        }

        //Los efectos son para trabajar con operaciones asincronas
    },
    LoginRegistro: async function(operacion, datosForm){
        try {
            const _respuesta = await fetch(`http://localhost:3003/api/zonaCliente/${operacion}`, {
                method: "POST",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(datosForm)
            });
            return await _respuesta.json(); //.codigo===0

        } catch (error) {
            console.log('Error al registrar el usuario!!!!!', error)
            return null; //false;
        }
    },
    VerificarCode: async function(operacion, email, codigo, jwt){
        try {
            const _respuesta=await fetch('http://localhost:3003/api/zonaCliente/VerificarCode', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ operacion, email, codigo, jwt})
            });
            return await _respuesta.json();
        } catch (error) {
            console.error('Error verificando el código 2FA: ', error);
            return { codigo: 1, mensaje: 'Error al verificar 2FA'};
        }
    },
    //#endregion........................................................
    Categorias: async function(pathCat){
        try {
            const _respuesta=await fetch(`http://localhost:3003/api/zonaTienda/Categorias?pathCat=${pathCat}`);
            return await _respuesta.json(); //codigo===0;
        } catch (error) {
            console.log('Error al recuperar categorias ...', error);
            return null;
        }
    }

}