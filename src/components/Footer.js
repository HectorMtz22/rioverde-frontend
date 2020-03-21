import React, { Component } from 'react';
import { Link }from 'react-router-dom';

export default class Footer extends Component {
    render() {
        return (
            <footer className="strip1">
                <p>&copy; Copyright 2020</p>
                <main className="mobile-footer">
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
