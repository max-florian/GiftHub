import { ChangeEvent, MouseEvent as EventMouse, useEffect, useState } from "react";
import utils from "../../utils/callApi";
import { getToken, saveToken, saveUserId } from "../../utils/storage";
import { useHistory } from "react-router-dom";
import { useLoggedState } from "../../hooks/globalState";

export default function useLoginState() {
    const [emailOrUsername, setEmailOrUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const history = useHistory();
    const { setLogged } = useLoggedState()

    useEffect(() => {
        if (getToken()) {
            return history.goBack();
        }
    }, [])

    const login = (e: EventMouse<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        utils.callApi({
            uri: '/login',
            method: 'POST',
            body: {
                emailusername: emailOrUsername,
                password: password
            },
            sendToken: false
        }).then((response) => {
            console.log(response.data)
            if (!response.ok) setErrorMessage(response.message);
            else {
                setErrorMessage('')
                setEmailOrUsername('');
                setPassword('');
                saveToken(response.data.token);
                saveUserId(response.data.userid);
                history.replace('/home');
                setLogged!(true);
            };
        });
    }

    const registro = (e: EventMouse<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        history.replace('/registro');
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
        registro: {
            onClick: registro
        },
        error: {
            message: errorMessage
        }
    }
}