import { useState } from "react";

/**
● Username
● Correo
● Contrasena
● Nombres
● Apellidos
● DPI
● Edad
● Inventario de Tarjetas compradas u obtenidas
● Transacciones de tarjetas
*/
interface User {
    username: string;
    email: string;
    password: string;
    name: string;
    lastname: string;
    dpi: number;
    age: number;
}

export default function useProfileState() {
    const [user, setUser] = useState<User | null>(null);

    return {
        user: user
    }
}