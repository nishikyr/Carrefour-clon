import useGlobalStore from '../globalState/storeGlobal';

export default {
    fetchRefreshToken: async (url, opciones) => {
        //Recupero el jwt actual el de jwt.session y el jwt.refresh
        const { jwt, setJwt } = useGlobalStore.getState();
    
        //Aqui si no paso el token en los headers, me lo tiene que añadir autoamticamente usando el access token del jwt.session
        //antes de llamarlo con fetch
        if (!opciones.headers['Authorization']) {
            opciones.headers['Authorization'] = 'Bearer ' + jwt.session;
        }
        //Lanzamos la peticion nuevamente.
        let respuesta = await fetch(url, opciones);
    
        if (respuesta.status === 401 && jwt.refresh) {
            // En caso de que caducara el token intentamos renovarlo llamando al enPoint
            const _refreshResp = await fetch('http://localhost:3003/api/zonaCliente/Refresh', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + jwt.refresh
                }
            });
            //para comprobar podemos usar .ok o .status === 200 (ambos son válidos) ya que son propiedades que tiene el Response
            if (_refreshResp.ok) {
                const nuevosTokens = await _refreshResp.json();
                setJwt('session', nuevosTokens.nuevoAccessToken);
                setJwt('refresh', nuevosTokens.nuevoRefreshToken);
    
                // Repetimos la petición original
                opciones.headers['Authorization'] = 'Bearer ' + nuevosTokens.nuevoAccessToken;
                //intentamos nuevamente hacer la peticion
                respuesta = await fetch(url, opciones);
            } else {
                //Refresh token inválido o expirado
                return { codigo: 1, mensaje: 'Token expirado. Inicie sesión nuevamente' };
            }
        }
    
        return respuesta;
    },
}
