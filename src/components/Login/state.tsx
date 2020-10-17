import { useState } from "react";

export default function useLoginState() {
    const [emailOrUsername, setEmailOrUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return {
        emailOrUsername: {
            value: emailOrUsername,
            onChange: setEmailOrUsername
        },
        password: {
            value: password,
            onChange: setPassword
        }
    }
}