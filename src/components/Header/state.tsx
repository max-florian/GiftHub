import React, { useEffect, useState } from "react";
import { useLoggedState, useUserIdState } from "../../hooks/globalState";
import useSessionController from "../../hooks/useSessionController";
import { removeToken, removeUserId } from "../../utils/storage";

interface NavItem {
    title: string;
    path: string;
    icon: JSX.Element;
    cname: string;
    onClick?: () => void;
}

const navUser = (removeData: any): NavItem[] => [
    {
        title: 'Inicio',
        path: '/home',
        icon: <i className="fas fa-home"></i>,
        cname: 'nav-text',
    },
    {
        title: 'Inventario',
        path: '/inventariousuario',
        icon: <i className="fas fa-th"></i>,
        cname: 'nav-text',
    },
    {
        title: 'Compra',
        path: '/carrocompra',
        icon: <i className="fas fa-shopping-cart"></i>,
        cname: 'nav-text',
    },
    {
        title: 'Transacciones',
        path: '/transactionlog',
        icon: <i className="fas fa-retweet"></i>,
        cname: 'nav-text',
    },
    {
        title: 'Perfil',
        path: '/profile',
        icon: <i className="fas fa-user"></i>,
        cname: 'nav-text',
    },
    {
        title: 'Cerrar sesión',
        path: '/',
        icon: <i className="fas fa-times"></i>,
        cname: 'nav-text',
        onClick: removeData
    }
]

const navAdmin = (removeData: any): NavItem[] => [
    {
        title: 'Inicio',
        path: '/home',
        icon: <i className="fas fa-home"></i>,
        cname: 'nav-text',
    },
    {
        title: 'Catalogo',
        path: '/catalogoadmin',
        icon: <i className="fas fa-book-open"></i>,
        cname: 'nav-text',
    },
    {
        title: 'Transacciones',
        path: '/transactionadmin',
        icon: <i className="fas fa-retweet"></i>,
        cname: 'nav-text',
    },
    {
        title: 'Perfil',
        path: '/profile',
        icon: <i className="fas fa-user"></i>,
        cname: 'nav-text',
    },
    {
        title: 'Cerrar sesión',
        path: '/',
        icon: <i className="fas fa-times"></i>,
        cname: 'nav-text',
        onClick: removeData
    }
]

export default function useHeaderState() {
    useSessionController({});
    const { logged, setLogged } = useLoggedState();
    const { userId } = useUserIdState();

    const [showSidebar, setShowSidebar] = useState(false);
    const [nav, setNav] = useState<NavItem[]>([]);
    const toggleSidebar = () => setShowSidebar(show => !show);

    function Logout() {
        removeToken();
        removeUserId();
        setLogged!(false);
    }

    useEffect(() => {
        setNav(userId === '5f9ad02f22e7fbe0282bf901' ? navAdmin(Logout) : navUser(Logout));
    }, [userId, setNav]);

    return {
        header: {
            toggleSidebar,
            showSidebar,
            nav
        },
        logged
    }
}