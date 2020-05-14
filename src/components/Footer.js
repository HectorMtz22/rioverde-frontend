import React, { Component } from 'react';
import { Link }from 'react-router-dom';

export default class Footer extends Component {
    render() {
        let footer = 'strip1';
        let mobileFooter = 'mobile-footer';
        if (!localStorage.getItem('auth')) {
            mobileFooter += ' invisible';
        } else {
            footer += ' invisible';
        }
        return (
            <footer className={footer}>
                <p>&copy; Copyright 2020</p>
                <main className={mobileFooter}>
                    <Link to="/sales">
                        <p>Ventas</p>
                    </Link>
                    <Link to="/products">
                        <p>Productos</p>
                    </Link>
                    <Link to="/vendors">
                        <p>Proveedores</p>
                    </Link>
                </main>
            </footer>
        )
    }
}
