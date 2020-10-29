import { ChangeEvent, MouseEvent as EventMouse, useState } from "react";
import utils from "../../utils/callApi";
import { useHistory } from "react-router-dom";

export default function useRegistroState() {
    const [nombre, setNombre] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [contrasena, setContrasena] = useState<string>('');
    const [respuestaMessage, setRespuestaMessage] = useState<string>('');
    const history = useHistory();

    const registro = (e: EventMouse<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        utils.callApi({
            uri: '/registro',
            method: 'POST',
            body: {
                nombre: nombre,
                id: id,
                email: email,
                contrasena: contrasena
            }
        }).then((response) => {
            if (!response.ok){ 
                setRespuestaMessage(response.message);
            }else {
                setRespuestaMessage(response.message);
                setTimeout(function(){
                    history.replace('/');
                }, 2000);
                
            };
        });
    }

    const login = (event: any) => {
        event.preventDefault();
        history.replace('/');
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
        login: {
            onClick: login
        },
        respuesta: {
            message: respuestaMessage
        }
    }
}