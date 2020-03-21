import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <header className="strip1">
                <Link to="/">
                    <h1 className="isotipo">Abarrotes "Rio Verde"</h1>
                </Link>
                <main className="mobile-header">
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
