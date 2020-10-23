import React from "react";
import useProfileState from "./state";

export default function Profile() {
    const { user } = useProfileState();

    return (
        <form>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Username</label>
                    <input type="text" className="form-control" id="inputEmail4" />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Email</label>
                    <input type="email" className="form-control" id="inputPassword4" />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Name</label>
                    <input type="text" className="form-control" id="inputEmail4" />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Lastname</label>
                    <input type="text" className="form-control" id="inputPassword4" />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-3">
                    <label htmlFor="inputZip">Age</label>
                    <input type="number" className="form-control" id="inputZip" />
                </div>
                <div className="form-group col-md-9">
                    <label htmlFor="inputCity">DPI</label>
                    <input type="number" className="form-control" id="inputCity" />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="inputAddress">New Password</label>
                <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
            </div>
            <button type="submit" className="btn btn-primary">Save changes</button>
        </form>
    )
}