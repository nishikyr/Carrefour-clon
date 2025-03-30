import autoRefresh from "./autoRefresh";

export default{
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
    ActivarCuenta: async function(datosCliente, jwt, codigo){
        try{
            const _respuesta = await autoRefresh.fetchRefreshToken('http://localhost:3003/api/zonaCliente/ActivarCuenta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwt.verificacion
                    
                },
                body: JSON.stringify({
                    email: datosCliente.cuenta?.email,
                    codigo: codigo
                })
            });
            return await _respuesta.json();


        }catch(error){
            console.error('Error al validar el código:', error);
            alert('Error de servidor al verificar el código.');
            return {codigo: 1}; //Devuelve algo aunque sea fallo
        }
    }
}