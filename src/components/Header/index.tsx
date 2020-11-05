import React from "react";
import { Link } from "react-router-dom";
import useHeaderState from "./state";

export default function Header() {
    const { header, logged } = useHeaderState();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: 50 }}>
            {
                logged && <Link to="#" className="menu-bars">
                    <i className="fas fa-bars" onClick={header.toggleSidebar}></i>
                </Link>
            }
            <Link to="/home" className="navbar-brand" style={{ marginLeft: 10 }}>Gifthub</Link>

            <nav className={header.showSidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className="nav-menu-items" onClick={header.toggleSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <i className="fas fa-times"></i>
                        </Link>
                    </li>
                    {header.nav.map((item, index) =>
                        <li key={index} className={item.cname}>
                            <Link to={item.path} onClick={item.onClick}>
                                {item.icon}
                                <span className='navbarText'>{item.title}</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </nav>

    )
}