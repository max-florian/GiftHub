import React from "react";
import { Link } from "react-router-dom";
import { removeToken, removeUserId } from "../../utils/storage";

export function removeData() {
    removeToken();
    removeUserId();
}

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Gifthub</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to="/home" className="nav-link">Inicio</Link>
                    </li>
                </ul>
                <ul className="form-inline my-2 my-lg-0">
                    <Link to="/profile" className="nav-link">Mi Perfil</Link>
                    <Link onClick={removeData} to="/" className="nav-link">Cerrar sesión</Link>
                </ul>
            </div>
        </nav>
    )
}