import React from "react";
import useSessionController from "../../hooks/useSessionController";

export default function Home() {
    useSessionController({});
    return (
        <>
            <div className='row'>
                <div className='col-md-12'>
                    <h1>HOME</h1>
                </div>
            </div>
        </>
    );
}