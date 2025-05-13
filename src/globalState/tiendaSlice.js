const tiendaSlice=(set,get,store)=>{
    console.log('estamos en tiendaSlice...parametros recibidos desde modulo central storeGlobal.js...', set,get,store);
    return {
        pedido: {
            itemsPedido:[], //<---- array de objetos item de la forma: { producto: ...., cantidad: .... }
            metodoPago: { },
            direccionEnvio:{},
            direccionFacturacion:{},
            fechaPago: null,
            fechaEnvio:null,
            estado: '', //<----- en preparacion, en almacen, expedido en agencia de transporte, entregado
            subtotal: 0,
            gastosEnvio: 0,
            total: 0
        },
        setItemsPedido: (operacion, item) => set ( state => {
            //en 
            console.log('en setItemsPedido ...parametros operacion, item y valor del pedido antes de modificar: ', operacion, item, state.pedido.itemsPedido );

            let _items=state.pedido.itemsPedido; //<---- ESTO ES UNA REFERENCIA A ITEMSPEDIDO, NO ES UNA COPIA!!!!!!
            let _pos=_items.findIndex( it => it.producto._id == item.producto._id );

            switch (operacion) {
                case 'addItem':
                    //antes de añadir el item al array, debo comprobar si existe o no...pq sino duplica el mismo item con cantidad=1
                    if(_pos == -1){
                        console.log('en addItem, no existe el producto en array de items pedido y lo añadimos...')
                        _items.push(item);
                    } else {
                        console.log('en addItem, el producto a añadir al pedido ya existe en items pedido, INCREMENTAMOS CANTIDDAD EN UNO');
                        _items=_items.map( it => it.producto._id !== item.producto._id ? it : { ...it, cantidad: it.cantidad + 1})
                    }
                    break;
            
                case 'borrarItem':
                    console.log('en borrarItem....');
                    _items=_items.filter( it => it.producto._id !== item.producto._id);
                    break;
                
                case 'modificarItem':
                    console.log('modificando item, se da por hecho que ya existe el producto en itemsPedido, la variable _pos vale....', _pos);
                    if ( _pos !== -1){
                        _items=_items.map( it => it.producto._id !== item.producto._id ? it : { ...it, cantidad: it.cantidad + item.cantidad})
                    }
                    break;

                default:
                    break;
            }

            let _subtotal=Math.round( _items.reduce( (ac, el)=> (el.producto.precio * el.cantidad) + ac, 0  ) * 100) / 100;
            let _total=Math.round( (_subtotal + state.pedido.gastosEnvio) * 100) / 100;
            
            return {
                ...state,
                pedido:{
                        ...state.pedido,
                        itemsPedido: _items,
                        subtotal: _subtotal,
                        total: _total
                }
            }
            
        } ) 

    }

}

export default tiendaSlice;