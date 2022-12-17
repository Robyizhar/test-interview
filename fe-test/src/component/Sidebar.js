import React,{ useState, Fragment } from 'react';
import {Link, useLocation} from 'react-router-dom';

const Sidebar = () => {

    const [active, setActive] = useState('');

    const sidebarToggle = () => {
        active === '' ? setActive('active') : setActive('');
        active === '' ? document.body.classList.add('sidebar-folded') : document.body.classList.remove('sidebar-folded'); 
    }
    
    const location = useLocation();

    return (
        <Fragment>
            <nav className="sidebar">
                <div className="sidebar-header">
                    <div className={`${active === "active" ? 'sidebar-toggler active' : 'sidebar-toggler not-active'}`} onClick={sidebarToggle}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="sidebar-body">
                    <ul className="nav">
                        <li className="nav-item nav-category">Master Data</li>
                        <li className="nav-item">
                            <Link to="/" className={`nav-link ${location.pathname === '/' && 'active'}`}> 
                                <i className="bi bi-newspaper"></i>
                                <span className="link-title">List</span> 
                            </Link> 
                        </li>
                        <li className="nav-item">
                            <Link to="/form" className={`nav-link ${location.pathname === '/form' && 'active'}`}> 
                                <i className="bi bi-newspaper"></i>
                                <span className="link-title">Form</span> 
                            </Link> 
                        </li>
                    </ul>
                </div>
            </nav>
        </Fragment>
    )
}

export default Sidebar