import { ChangeEvent, MouseEvent as EventMouse, useState } from "react";
import callApi from "../../utils/callApi";

export default function useRegistroState() {
    const [nombre, setNombre] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [contrasena, setContrasena] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const registro = (e: EventMouse<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        callApi({
            uri: '/registro',
            method: 'POST',
            body: {
                nombre: nombre,
                id: id,
                email: email,
                contrasena: contrasena
            }
        }).then((data) => {
            if (!data.ok) setErrorMessage(data.message);
            else setErrorMessage('');
        });
    }

    const onChangeNombre = (event: ChangeEvent<HTMLInputElement>) => {
        setNombre(event.target.value);
    }

    const onChangeId = (event: ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
    }

    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const onChangeContrasena = (event: ChangeEvent<HTMLInputElement>) => {
        setContrasena(event.target.value);
    }

    return {
        nombre: {
            value: nombre,
            onChange: onChangeNombre
        },
        id: {
            value: id,
            onChange: onChangeId
        },
        email: {
            value: email,
            onChange: onChangeEmail
        },
        contrasena: {
            value: contrasena,
            onChange: onChangeContrasena
        },
        registro: {
            onClick: registro
        },
        error: {
            message: errorMessage
        }
    }
}