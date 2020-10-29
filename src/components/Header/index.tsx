import React ,  { useState } from "react";
import { Link } from "react-router-dom";
import { removeToken, removeUserId } from "../../utils/storage";
import { navItems, navAdmin } from "../mainLayout/navItems";
import { getUserId } from "../../utils/storage";

export function removeData() {
    removeToken();
    removeUserId();
}

export function Header(){
    const usr = getUserId();
    if(usr){
        return HeaderLogged();
    }else{
        return Headerf();
    }
}

export function Headerf() {
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Gifthub</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {/* <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to="/home" className="nav-link">Inicio</Link>
                    </li>
                </ul> */}
                {/* <ul className="form-inline my-2 my-lg-0">
                    <Link to="/profile" className="nav-link">Mi Perfil</Link>
                    <Link onClick={removeData} to="/" className="nav-link">Cerrar sesión</Link>
                </ul> */}
            </div>
        </nav>
    )
}

export function HeaderLogged() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () =>setSidebar(!sidebar)
    let nav = [];
    const usr = getUserId();
    if(usr == '5f9ad02f22e7fbe0282bf901'){
        nav = navAdmin;
    }else{
        nav = navItems;
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="#" className="menu-bars">
                <i className="fas fa-bars" onClick={showSidebar}></i>
            </Link>
            <Link to="/home" className="navbar-brand" style={{marginLeft:10}}>Gifthub</Link>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to="/home" className="nav-link"></Link>
                    </li>
                </ul>
                <ul className="form-inline my-2 my-lg-0">
                    <Link to="/profile" className="nav-link">Mi Perfil</Link>
                    <Link onClick={removeData} to="/" className="nav-link">Cerrar sesión</Link>
                </ul>
            </div>
            <nav className={sidebar?'nav-menu active':'nav-menu'}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <i className="fas fa-times"></i>
                        </Link>
                    </li>
                    {nav.map((item,index)=>{
                        return(
                            <li key={index} className={item.cname}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span className='navbarText'>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </nav>
        
    )
}