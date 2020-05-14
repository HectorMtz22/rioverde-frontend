import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PageNotFound extends Component {
    render() {
        return (
            <form action="">
                <h2>Página no encontrada. Error 404</h2>
                <Link to="/">
                    <button className="strip1">
                        Regresar a Inicio
                    </button>
                </Link>
            </form>
        )
    }
}
