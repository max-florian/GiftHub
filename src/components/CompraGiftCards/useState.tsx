import { ChangeEvent, MouseEvent as EventMouse, useState } from "react";


export default function compraState() {
    const [emailOrUsername, setEmailOrUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const login = (e: EventMouse<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    }

    const onChangeEmailOrUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setEmailOrUsername(event.target.value);
    }

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    return {
        emailOrUsername: {
            value: emailOrUsername,
            onChange: onChangeEmailOrUsername
        },
        password: {
            value: password,
            onChange: onChangePassword
        },
        login: {
            onClick: login
        },
        error: {
            message: errorMessage
        }
    }
}