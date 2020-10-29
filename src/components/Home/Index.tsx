import React from "react";
import useSessionController from "../../hooks/useSessionController";

export default function Home() {
    useSessionController({});
    return (
        <>
            <div className='row' style={{ padding: 20 }}>
                <div className='col-md-12'>
                    <h1>¡Bienvenido a Gifthub!</h1>
                    <p>El lugar donde encuentras todas tus Gift Cards</p>
                </div>
            </div>
        </>
    );
}