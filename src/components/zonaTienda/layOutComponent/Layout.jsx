import './Layout.css';
import { Outlet} from 'react-router-dom';
import Header from './headerComponent/Header';
import Footer from './footerComponent/Footer';

const Layout=()=>{

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col">
                    <Header/>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <Outlet />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Footer/>
                </div>
            </div>
        </div>        
    );
}

export default Layout