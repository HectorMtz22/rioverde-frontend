import React, { Component } from 'react'
import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
const apiLoginUser = api + '/users/login.php';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export default class CreateUser extends Component {
    state = {
        _id: '',
        name: '',
        email: '',
        tel: '',
        pass: '',
        confirmPass: ''
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const user = {
            method: "POST",
            change: "user",
            id: this.state._id,
            name: this.state.name,
            email: this.state.email,
            tel: this.state.tel,
            pass: this.state.pass,
            confirmPass: this.state.confirmPass
        }
        if (user.pass !== user.confirmPass || user.pass.length < 8) {
            alert("Las contraseñas no coinciden o no contiene al menos 8 carácteres");
            this.setState({
                pass: '',
                confirmPass: ''
            });
            return 0;
        }
        await axios.post(apiLoginUser, user, {
            headers: headers
        });
        this.logout();
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('auth');
        window.location = "/";
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <h3>Modificar datos de usuario</h3>
                    <main>
                        <input type="number" onChange={this.onInputChange} name="_id" value={this.state._id} required autoFocus/>
                        <label htmlFor="_id" className="label-name">
                            <span className="content-name">Código</span>
                        </label>
                    </main>
                    <main>
                        <input type="text" onChange={this.onInputChange} name="name" value={this.state.name} required/>
                        <label htmlFor="name" className="label-name">
                            <span className="content-name">Nombre</span>
                        </label>
                    </main>
                    <main>
                        <input type="text" onChange={this.onInputChange} name="email" value={this.state.email} required/>
                        <label htmlFor="email" className="label-name">
                            <span className="content-name">Email</span>
                        </label>
                    </main>
                    <main>
                        <input type="number" onChange={this.onInputChange} name="tel" value={this.state.tel} required/>
                        <label htmlFor="tel" className="label-name">
                            <span className="content-name">Teléfono</span>
                        </label>
                    </main>
                    <main>
                        <input type="password" onChange={this.onInputChange} name="pass" value={this.state.pass} required/>
                        <label htmlFor="pass" className="label-name">
                            <span className="content-name">Contraseña</span>
                        </label>
                    </main>
                    <main>
                        <input type="password" onChange={this.onInputChange} name="confirmPass" value={this.state.confirmPass} required/>
                        <label htmlFor="confirmPass" className="label-name">
                            <span className="content-name">Confirmar contraseña</span>
                        </label>
                    </main>
                    <button type="submit" className="strip1" onSubmit={this.onSubmit}>
                        Guardar
                    </button>
                </form>
            </div>
        )
    }
}
