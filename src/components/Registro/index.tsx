import React from "react";
import useRegistroState from "./state";

export default function Registro() {
    const { nombre, id, email, contrasena, registro, error } = useRegistroState();

    return (
        <form>
            <div className="form-group">
                <div style={{ display: 'flex' }}>
                    <label htmlFor="nombreInput">Nombre</label>
                </div>
                <input
                    id="nombreInput"
                    className="form-control"
                    type="text"
                    onChange={nombre.onChange}
                    value={nombre.value} />
            </div>
            <div className="form-group">
                <div style={{ display: 'flex' }}>
                    <label htmlFor="idInput">ID</label>
                </div>
                <input
                    id="idInput"
                    className="form-control"
                    type="text"
                    onChange={id.onChange}
                    value={id.value} />
            </div>
            <div className="form-group">
                <div style={{ display: 'flex' }}>
                    <label htmlFor="emailInput">Correo electrónico</label>
                </div>
                <input
                    id="emailInput"
                    className="form-control"
                    type="text"
                    onChange={email.onChange}
                    value={email.value} />
            </div>
            <div className="form-group">
                <div style={{ display: 'flex' }}>
                    <label htmlFor="contrasenaInput">Contraseña</label>
                </div>
                <input
                    id="contrasenaInput"
                    className="form-control"
                    type="text"
                    onChange={contrasena.onChange}
                    value={contrasena.value} />
            </div>
            <div className="row">
                <div style={{ marginTop: 8 }} className="col">
                    <button type="submit" className="btn btn-primary btn-block" onClick={registro.onClick}>Registrarse</button>
                </div>
            </div>
            <a href="index.html">¿Ya tienes una cuenta? Inicia Sesión</a>
            {
                error.message.length > 0 &&
                <div style={{ marginTop: 8, fontSize: 16 }} className="alert alert-danger" role="alert">
                    {error.message}
                </div>
            }
        </form>
    )
}