import { ChangeEvent, useState } from "react";

export default function useLoginState() {
    const [emailOrUsername, setEmailOrUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

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
        }
    }
}