import React, { Fragment } from "react";
import useProfileState from "./state";

export default function Profile() {
    const { user, handles, actions, loading, updating } = useProfileState();

    return (
        <Fragment>
            <h1 style={{ fontSize: 40, padding: 20 }}>Mi perfil</h1>
            {
                loading ? <div>Cargando...</div>
                    : 
                    <div className='row'>
                        <div className='col-md-4'></div>
                        <div className='col-md-4'>
                            <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" id="username"
                                        placeholder="Nombre de usuario"
                                        value={user.username}
                                        onChange={handles.setUsername} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email"
                                        placeholder="Correo electrónico"
                                        value={user.email}
                                        onChange={handles.setEmail} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name"
                                        placeholder="Nombres"
                                        value={user.name}
                                        onChange={handles.setName} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="lastname">Lastname</label>
                                    <input type="text" className="form-control" id="lastname"
                                        placeholder="Apellidos"
                                        value={user.lastname}
                                        onChange={handles.setLastname} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <label htmlFor="age">Age</label>
                                    <input type="number" className="form-control" id="age"
                                        placeholder="Edad"
                                        value={user.age}
                                        onChange={handles.setAge} />
                                </div>
                                <div className="form-group col-md-9">
                                    <label htmlFor="dpi">DPI</label>
                                    <input type="number" className="form-control" id="dpi"
                                        placeholder="Documento de identificación"
                                        value={user.dpi}
                                        onChange={handles.setDpi} />
                                </div>
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="newpassword">New Password</label>
                                <input type="password" className="form-control" id="newpassword"
                                    placeholder="Nueva contraseña"
                                    value={user.password}
                                    onChange={handles.setPassword} />
                            </div> */}
                            <div className="row">
                                <div className="col">
                                    <button type="submit" id="btnUpdate" className="btn btn-primary btn-block"
                                        onClick={actions.updateProfile}
                                        disabled={updating}>
                                        {
                                            updating ? "Updating..." : "Save changes"
                                        }
                                    </button>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                    
            }
        </Fragment>
    )
}