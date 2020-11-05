import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getToken, getUserId } from "../utils/storage";
import { useLoggedState, useUserIdState } from "./globalState";

type Props = {
    adminOnly?: boolean
}

export default function useSessionController({ adminOnly = false }: Props) {
    const history = useHistory();
    const { setLogged } = useLoggedState();
    const { setUserId } = useUserIdState();

    useEffect(() => {
        const userid = getUserId();
        const token = getToken();

        if (!userid || !token) {
            setUserId!('');
            setLogged!(false);
            return history.push('/');
        }

        setUserId!(userid);
        setLogged!(true);
        if (adminOnly && userid !== '5f9ad02f22e7fbe0282bf901') history.goBack();

    }, [adminOnly, history, setLogged]);
}