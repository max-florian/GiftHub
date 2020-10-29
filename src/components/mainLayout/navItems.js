import React from 'react';
export const navItems = [
    {
        title:'Inicio',
        path:'/home',
        icon:<i className="fas fa-home"></i>,
        cname:'nav-text'
    },
    {
        title:'Inventario',
        path:'/inventariousuario',
        icon:<i className="fas fa-th"></i>,
        cname:'nav-text'
    },
    {
        title:'Compra',
        path:'/carrocompra',
        icon:<i className="fas fa-shopping-cart"></i>,
        cname:'nav-text'
    },
    {
        title:'Transacciones',
        path:'/transactionlog',
        icon:<i className="fas fa-retweet"></i>,
        cname:'nav-text'
    }
]

export const navAdmin = [
    {
        title:'Inicio',
        path:'/home',
        icon:<i className="fas fa-home"></i>,
        cname:'nav-text'
    },
    {
        title:'Catalogo',
        path:'/catalogoadmin',
        icon:<i className="fas fa-book-open"></i>,
        cname:'nav-text'
    },
    {
        title:'Transacciones',
        path:'/transactionadmin',
        icon:<i className="fas fa-retweet"></i>,
        cname:'nav-text'
    }
]