import React from "react";
import useRegistroState from "./state";

export default function Registro() {
    const { nombre, id, email, contrasena, registro, error } = useRegistroState();

    return (
        <form>
            <div className="form-group">
                <label htmlFor="nombreInput">Nombre</label>
                <input
                    id="nombreInput"
                    className="form-control"
                    type="text"
                    onChange={nombre.onChange}
                    value={nombre.value} />
            </div>
            <div className="form-group">
                <label htmlFor="idInput">ID</label>
                <input
                    id="idInput"
                    className="form-control"
                    type="text"
                    onChange={id.onChange}
                    value={id.value} />
            </div>
            <div className="form-group">
                <label htmlFor="emailInput">Correo electrónico</label>
                <input
                    id="emailInput"
                    className="form-control"
                    type="text"
                    onChange={email.onChange}
                    value={email.value} />
            </div>
            <div className="form-group">
                <label htmlFor="contrasenaInput">Contraseña</label>
                <input
                    id="contrasenaInput"
                    className="form-control"
                    type="text"
                    onChange={contrasena.onChange}
                    value={contrasena.value} />
            </div>
            <div className="row">
                <div className="col">
                    <button type="submit" className="btn btn-primary btn-block" onClick={registro.onClick}>Registrarse</button>
                </div>
            </div>
            {
                error.message.length > 0 &&
                <div style={{ marginTop: 8, fontSize: 16 }} className="alert alert-danger" role="alert">
                    {error.message}
                </div>
            }
        </form>
    )
}