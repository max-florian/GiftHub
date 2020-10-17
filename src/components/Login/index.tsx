import React from "react";
import useLoginState from "./state";

export default function Login() {
    const { emailOrUsername, password, login, error } = useLoginState();

    return (
        <form>
            <div className="form-group">
                <label htmlFor="emailInput">Correo electrónico o nombre de usuario</label>
                <input
                    id="emailInput"
                    className="form-control"
                    type="text"
                    onChange={emailOrUsername.onChange}
                    value={emailOrUsername.value} />
            </div>
            <div className="form-group">
                <label htmlFor="passwordInput">Contraseña</label>
                <input
                    id="passwordInput"
                    className="form-control"
                    type="password"
                    onChange={password.onChange}
                    value={password.value} />
            </div>
            <div className="row">
                <div className="col">
                    <button type="button" className="btn btn-secondary btn-block">Crear una cuenta</button>
                </div>
                <div className="col">
                    <button type="submit" className="btn btn-primary btn-block" onClick={login.onClick}>Entrar</button>
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