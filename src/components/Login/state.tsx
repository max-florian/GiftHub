import { ChangeEvent, MouseEvent as EventMouse, useState } from "react";
import callApi from "../../utils/callApi";
import { saveToken } from "../../utils/storage";

export default function useLoginState() {
    const [emailOrUsername, setEmailOrUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const login = (e: EventMouse<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        callApi({
            uri: '/login',
            method: 'POST',
            body: {
                emailusername: emailOrUsername,
                password: password
            }
        }).then((response) => {
            if (!response.ok) setErrorMessage(response.message);
            else {
                setErrorMessage('')
                setEmailOrUsername('');
                setPassword('');
                saveToken(response.data.token)
            };
        });
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