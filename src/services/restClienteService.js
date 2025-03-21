export default{
    ComprobarEmail: async function(email){
        try {
            const _respuesta = await fetch('http://localhost:3003/api/zonaCliente/ComprobarEmail', {
                method: POST,
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
    RegistrarDatosCliente: async function(datosFormRegistro){
        try {
            const _respuesta = await fetch('http://localhost:3003/api/zonaCliente/Registro', {
                method: POST,
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({datosFormRegistro})
            });
            return _respuesta.json().codigo === 0;

        } catch (error) {
            console.log('Erro al registrar el usuario', error)
            return false;
        }
    }
}