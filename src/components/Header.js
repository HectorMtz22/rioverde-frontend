import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
    render() {
        let mobileHeader = 'mobile-header';
        if (!localStorage.getItem('auth')) {
            mobileHeader += ' invisible';
        }
        return (
            <header className="strip1">
                <section>
                    <Link to="/">
                        <h2 className="isotipo">"Rio Verde"</h2>
                    </Link>
                </section>
                <main className={mobileHeader}>
                    <Link to="/output">
                        <span>Salidas</span>
                    </Link>
                    <Link to="/sales">
                        <span>Ventas</span>
                    </Link>
                    <Link to="/products">
                        <span>Productos</span>
                    </Link>
                    <Link to="/vendors">
                        <span>Proveedores</span>
                    </Link>
                </main>
            </header>
        )
    }
}
