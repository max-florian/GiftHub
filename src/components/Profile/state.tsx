import { ChangeEvent, MouseEvent as EventMouse, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../utils/callApi";
import { getUserId } from "../../utils/storage";

/**
● Username
● Correo
● Contrasena
● Nombres
● Apellidos
● DPI
● Edad
*/
interface User {
    _id?: string;
    username?: string;
    email?: string;
    password?: string;
    name?: string;
    lastname?: string;
    dpi?: number;
    age?: number;
}

export default function useProfileState() {
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [user, setUser] = useState<User>({
        _id: '',
        age: 0,
        dpi: 0,
        email: '',
        lastname: '',
        name: '',
        password: '',
        username: ''
    });
    const history = useHistory();

    useEffect(() => {
        setLoading(true);
        const userId = getUserId();
        if (!userId) return history.replace('/');

        api.callApi({ uri: `/users/${userId}` })
            .then(response => {
                changeUser(response.data.user as User)
                setLoading(false);
            }).catch(error => {
                console.log(error);
                setLoading(false);
            })
    }, [history]);

    const updateProfile = (event: EventMouse<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const userId = getUserId();
        if (!userId) return history.replace('/');

        setUpdating(true);
        api.callApi({ uri: `/users/${userId}`, method: 'PUT', body: { user } })
            .then(response => {
                changeUser(response.data)
                setUpdating(false);
            }).catch(error => {
                console.error(error);
                setUpdating(false);
            })
    }

    const goBack = () => {
        history.goBack();
    }

    const changeUser = (newInfo: User) => {
        setUser((user) => ({ ...user, ...newInfo }));
    }

    const setAge = (event: ChangeEvent<HTMLInputElement>) => {
        changeUser({ age: Number(event.target.value) });
    }

    const setDpi = (event: ChangeEvent<HTMLInputElement>) => {
        changeUser({ dpi: Number(event.target.value) });
    }

    const setEmail = (event: ChangeEvent<HTMLInputElement>) => {
        changeUser({ email: event.target.value });
    }

    const setLastname = (event: ChangeEvent<HTMLInputElement>) => {
        changeUser({ lastname: event.target.value });
    }

    const setName = (event: ChangeEvent<HTMLInputElement>) => {
        changeUser({ name: event.target.value });
    }

    const setUsername = (event: ChangeEvent<HTMLInputElement>) => {
        changeUser({ username: event.target.value });
    }

    const setPassword = (event: ChangeEvent<HTMLInputElement>) => {
        changeUser({ password: event.target.value });
    }

    return {
        user,
        handles: {
            setPassword,
            setUsername,
            setLastname,
            setName,
            setEmail,
            setDpi,
            setAge
        },
        actions: {
            updateProfile,
            goBack
        },
        loading,
        updating
    }
}