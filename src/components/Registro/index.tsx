import React from "react";
import { Link } from "react-router-dom";
import useRegistroState from "./state";

export default function Registro() {
    const { nombre, id, email, contrasena, registro, respuesta } = useRegistroState();

    return (
        <>
            <div className='row'>
                <div className='col-md-4'></div>
                <div className='col-md-4'>
                    <form>
                        <h1 style={{ fontSize: 40, margin: 20 }}>Gifthub</h1>
                        <h4 style={{ margin: 20 }}>Registrate</h4>
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
                                type="password"
                                onChange={contrasena.onChange}
                                value={contrasena.value} />
                        </div>
                        <div className="row">
                            <div style={{ marginTop: 8 }} className="col">
                                <button type="submit" className="btn btn-primary btn-block" id="btnRegistro" onClick={registro.onClick}>Registrarse</button>
                            </div>
                        </div>
                        <a href="/">
                            ¿Ya tienes una cuenta? Inicia Sesión
                        </a>
                        {
                            respuesta.message.length > 0 &&
                            <div style={{ marginTop: 8, fontSize: 16 }} id="alertRegistro" className="alert alert-primary" role="alert">
                                {respuesta.message}
                            </div>
                        }
                    </form>
                </div>
                <div className='col-md-4'></div>
            </div>
        </>
    )
}