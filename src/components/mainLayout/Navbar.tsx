import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { navItems} from "./navItems";

export default function Navbar(){
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () =>setSidebar(!sidebar)
    return(
        <>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <i className="fas fa-bars" onClick={showSidebar}></i>
                </Link>
            </div>
            <nav className={sidebar?'nav-menu active':'nav-menu'}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <i className="fas fa-times"></i>
                        </Link>
                    </li>
                    {navItems.map((item,index)=>{
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
        </>
    );
}
