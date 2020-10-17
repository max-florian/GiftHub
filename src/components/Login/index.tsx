import React from "react";
import useLoginState from "./state";

export default function Login() {
    const { emailOrUsername, password } = useLoginState();

    return (
        <div>
            <h1>Login Screen</h1>
        </div>
    )
}