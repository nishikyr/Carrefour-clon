import './MiniProductos.css'

const MiniProducto=({producto})=>{
    return (
            <div className="card" style={{"width": "18rem"}}>
                <img src={ producto.imagenes[0] }  className="card-img-top" style={{"height": "170px", "width": "170px"}} alt="..."/>
                <div className="card-body">
                <h3 className="card-title">{ producto.precio } €</h3>
                <h5 className="card-text text-body-secondary">{ producto.precioKg } €/Kg</h5>
                <p className="card-text"><strong>{ producto.nombre }</strong></p>
                <button type="button" className="btn btn-primary">Añadir</button>
                </div>
            </div>
    )
}

export default MiniProducto;