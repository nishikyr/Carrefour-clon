import './Header.css';
import {Link} from 'react-router-dom'

const Header=()=>{
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-white navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/"  >
                        <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDZweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgNDYgMzAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU4ICg4NDY2MykgLSBodHRwczovL3NrZXRjaC5jb20gLS0+CiAgICA8dGl0bGU+TG9nbyBmcmFuY2lhPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IlN5bWJvbHMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJsb2dvLWNhcnJlZm91ciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTExOS4wMDAwMDAsIDAuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCAtMC4wMDAwMDApIiBpZD0iTG9nby1mcmFuY2lhIj4KICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDExOS4wMDAwMDAsIDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IkxvZ28iPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIuODQxNTgzOCwwLjQzOTYyNTg4IEwwLjk3MjYxNDA1NCwxMi41NjQ3OTYgQzAuMzc5NzI4NzU3LDEzLjA5Njg4IDAsMTMuNzIxNDY4IDAsMTQuNjEyNzggQzAsMTUuNTAxMTE2IDAuMzc5NzI4NzU3LDE2LjEyODU1NiAwLjk3MjYxNDA1NCwxNi42NjM3NCBMMTIuODQxNTgzOCwyOC43ODQ0OTIgQzEyLjkxOTI4NjUsMjguODY2NDU2IDEyLjk5MTI3MDMsMjguOTAwNjggMTMuMDU0OCwyOC45MDA2OCBDMTMuMTY3Njg2NSwyOC45MDA2OCAxMy4yNDM4OTczLDI4Ljc5MDQ0NCAxMy4yNDEyMzM1LDI4LjY2NTIwNCBMMTMuMTM2NjA1NCwyOC40Mjk3MjggQzEwLjM1MTQ5MTksMjQuNzc0OTUyIDguMzIyOTc4OTIsMjAuNTgyMjY0IDguMzIyOTc4OTIsMTQuNjU3NTQ0IEM4LjMyMjk3ODkyLDguNzI2Nzk3NiAxMC4zNTE0OTE5LDQuNDUyMDQ2NCAxMy4xMzY2MDU0LDAuNzk0MzYzODQgQzEzLjIwNzIyMTYsMC43MjEzMzAzMiAxMy4yMzgzMDI3LDAuNjM3ODYyMiAxMy4yNDEyMzM1LDAuNTYwMzU2IEMxMy4yNDM4OTczLDAuNDMwNjgzIDEzLjE2NzY4NjUsMC4zMjYzNDgxNiAxMy4wNTQ4LDAuMzI2MzQ4MTYgQzEyLjk5MTI3MDMsMC4zMjYzNDgxNiAxMi45MTkyODY1LDAuMzU5MTM4NzIgMTIuODQxNTgzOCwwLjQzOTYyNTg4IFoiIGlkPSJQYXRoIiBmaWxsPSIjRkQwMjAyIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMi42NTc2MTA4LDAuMjY1MTk1MDggQzE3LjgwNDQ4NjUsMC4yNjUxOTUwOCAxNS45MDcxNzMsNy4wMzU0NzQ4IDE1LjkwNzE3MywxNS4xMDQzMTYgQzE1LjkwNzE3MywyMy4xNzc1ODQgMTcuODA0NDg2NSwyOS44NTY0NzIgMjIuNjU3NjEwOCwyOS44NTY0NzIgQzI1LjU3MjE0NTksMjkuODU2NDcyIDI4LjA1MzE2MjIsMjguMTc2MjcyIDI4LjA2MjExMzUsMjYuNzk2NCBDMjguMDYzNDgxMSwyNi40OTQ1ODQgMjcuOTQ0MTI5NywyNi4yMDU3ODggMjcuNjg3NjQ4NiwyNS45NTMzMjQgQzI2LjMwNjI4MTEsMjQuNjQxNjUyIDI1Ljc2NjcxMzUsMjMuMzI4NDkyIDI1Ljc2MzcyOTcsMjIuMTcyMDY4IEMyNS43NTM0MTA4LDE5Ljk2MDc3NiAyNy43MDIzMTg5LDE4LjMxMzkzMiAyOS40OTc5MzUxLDE4LjMxMzkzMiBDMzEuOTY3MjY0OSwxOC4zMTM5MzIgMzMuNDIyMzU2OCwyMC4yMjM0MDggMzMuNDIyMzU2OCwyMi42OTczMzIgQzMzLjQyMjM1NjgsMjUuMDQwNjg0IDMyLjQwNzk5NDYsMjYuOTkzNjg0IDMxLjMwNTM2MjIsMjguNTU2NDU2IEwzMS4yNDM0NDg2LDI4Ljc1Mzc0IEMzMS4yNDM0NDg2LDI4Ljg3NzEyIDMxLjMxNzE3MywyOC45NzcxODggMzEuNDI3Njk3MywyOC45NzcxODggQzMxLjQ5MjU5NDYsMjguOTc3MTg4IDMxLjU3MDY3MDMsMjguOTQzODMyIDMxLjY1NjIwNTQsMjguODU4MjcyIEw0NC4wNTU4MTYyLDE3LjA1ODgwNCBDNDQuNjc0OTUxNCwxNi41MzY1MTYgNDUuMDcwMDU0MSwxNS45MjcwNTYgNDUuMDcwMDU0MSwxNS4wNjIyOCBDNDUuMDcwMDU0MSwxNC4xOTQ2NTIgNDQuNjc0OTUxNCwxMy41ODUxOTIgNDQuMDU1ODE2MiwxMy4wNjcyNDQgTDMxLjY1NjIwNTQsMS4yNjM0NzMyIEMzMS41NzA2NzAzLDEuMTgyMjE0NzYgMzEuNDkyNTk0NiwxLjE0NTkzOTggMzEuNDI3Njk3MywxLjE0NTkzOTggQzMxLjMxNTY4MTEsMS4xNDU5Mzk4IDMxLjI0MzQ0ODYsMS4yNDYwNjM2IDMxLjI0MzQ0ODYsMS4zNjkzOTQgTDMxLjMwNTM2MjIsMS41NjgxNzg0IEMzMi40MDc5OTQ2LDMuMTI5NDI1MiAzMy40MjIzNTY4LDUuMDgzOTAwOCAzMy40MjIzNTY4LDcuNDI1Nzc3MiBDMzMuNDIyMzU2OCw5Ljg5Njc5OTYgMzEuOTY3MjY0OSwxMS44MDkxODk2IDI5LjQ5NzkzNTEsMTEuODA5MTg5NiBDMjcuNzAyMzE4OSwxMS44MDkxODk2IDI1Ljc1MzQxMDgsMTAuMTYzNzg0IDI1Ljc2MzcyOTcsNy45NTI0OTIgQzI1Ljc2NjcxMzUsNi43OTYwNTU2IDI2LjMwNjI4MTEsNS40ODI5MjA0IDI3LjY4NzY0ODYsNC4xNjk3ODUyIEMyNy45NDQxMjk3LDMuOTE1ODU4IDI4LjA2MzQ4MTEsMy42MzAwMTMyIDI4LjA2MjExMzUsMy4zMjY3NTg4IEMyOC4wNTMxNjIyLDEuOTQ1NDM2IDI1LjU3MjE0NTksMC4yNjUxOTUwOCAyMi42NTc2MTA4LDAuMjY1MTk1MDggWiIgaWQ9IlBhdGgiIGZpbGw9IiMwMDUyOUMiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==" alt="Carrefour" width="40" />
                    </Link>
                    <button className="botonmenu" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu">
                        ☰ Menú
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/Cliente/Panel/MisListas" ><i className="fa-regular fa-heart"></i> Listas y Mis productos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Cliente/Login" ><i className="fa-regular fa-user"></i> Mi cuenta</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Tienda/MostrarPedido" ><i className="fa-solid fa-cart-shopping"></i> Cesta</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    
            <nav className="navbar navbar-expand-lg navbar-light border-top bg-light">
                <div className="container d-flex justify-content-between">
                    <div className="d-flex flex-row">
                        <button className="botonEnvio">
                            <div className="cms-header__cp-delivery-container" data-v-3c550212="">
                                <span className="cms-header__delivery-to" data-v-3c550212=""><i className="fa-solid fa-location-dot" style={{ 'color':"#0970e6"}}></i> Envío a domicilio</span>
                                <span className="cms-header__cp" data-v-3c550212="">C.P: 28232</span>
                            </div>                    
                        </button>
                        <button className="botonDrive">
                            <div className="cms-header__drive-container" data-v-3c550212="">
                                <span style={{'color':' #c91010'}}><i className="fa-solid fa-car" style={{'color':' #c91010'}}></i> <strong> drive</strong></span>
                            </div>
                            <span className="cms-header__free" data-v-3c550212="">Gratis en &lt;24h</span>
                        </button>
                    </div>
                    <div className="input-group d-flex search-bar m-2">
                        <input className="search-input" type="text" id="search-input" placeholder="Buscar en todo Carrefour" />
                        <label htmlFor="search-input" className="input-group-text " style={{borderRadius: ' 0 50% 50% 0 ', 'backgroundColor':'blue', }}>
                            <span title="Buscar" aria-label="Buscar" ><i className="fa-solid fa-magnifying-glass" style={{'color':'white'}}></i></span>
                        </label>                
                    </div>
                </div>
            </nav>
    
            <div className="offcanvas offcanvas-start" id="offcanvasMenu">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">Categorías</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="list-group">
                        <li className="list-group-item"><Link to="#">Electrónica</Link></li>
                        <li className="list-group-item"><Link to="#">Moda</Link></li>
                        <li className="list-group-item"><Link to="#">Hogar</Link></li>
                        <li className="list-group-item"><Link to="#">Deportes</Link></li>
                        <li className="list-group-item"><Link to="#">Supermercado</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Header;