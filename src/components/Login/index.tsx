import React from "react";
import useLoginState from "./state";

export default function Login() {
    const { emailOrUsername, password, login, error } = useLoginState();

    return (
        <form>
            <h1 style={{ fontSize: 40, margin: 20 }}>Gifthub</h1>
            <h4 style={{ margin: 20 }}>Inicia sesión para continuar</h4>
            <div className="form-group">
                <div style={{ display: 'flex' }}>
                    <label style={{ fontSize: 20 }} htmlFor="emailInput">Correo electrónico o nombre de usuario</label>
                </div>
                <input
                    id="emailInput"
                    className="form-control"
                    type="text"
                    onChange={emailOrUsername.onChange}
                    value={emailOrUsername.value} />
            </div>
            <div className="form-group">
                <div style={{ display: 'flex' }}>
                    <label style={{ fontSize: 20 }} htmlFor="passwordInput">Contraseña</label>
                </div>
                <input
                    id="passwordInput"
                    className="form-control"
                    type="password"
                    onChange={password.onChange}
                    value={password.value} />
            </div>
            <div className="row row-cols-1 row-cols-sm-2">
                <div style={{ marginTop: 8 }} className="col">
                    <button type="button" className="btn btn-secondary btn-block">Crea una cuenta</button>
                </div>
                <div style={{ marginTop: 8 }} className="col">
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