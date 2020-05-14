import React, { Component } from 'react'
import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
const apiLoginUser = api + '/users/login.php';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export default class User extends Component {
    state = {
        usernumber : '',
        pass : ''
    }
    async componentDidMount() {
        await axios.get(api);
        if (JSON.parse(localStorage.getItem('user'))) {
            const user = JSON.parse(localStorage.getItem('user'));
            this.setState({
                _id: user._id,
                name : user.name,
                email : user.email,
                tel : user.tel
            })
        }
    }
    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit = async (e) => {
        e.preventDefault();
        const loginUser = {
            usernumber: this.state.usernumber,
            pass: this.state.pass
        };
        await axios.post(apiLoginUser, loginUser, {
            headers: headers
        }).then(response => response.data)
        .then((data) => {
            this.setState({ auth: data.auth})
            const user = {
                _id: data.usernumber,
                name: data.name,
                email: data.email,
                tel: data.tel
            }
            localStorage.setItem('user', JSON.stringify(user));
        })
        if(this.state.auth) {
            localStorage.setItem('auth', this.state.auth);
            window.location = "/sales";
        } else {
            alert("Usuario o contraseña incorrectos");
            window.location = "/";
        }
    }

    logout = async (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        localStorage.removeItem('auth');
        window.location = "/";
    }

    render() {
        if(localStorage.getItem('auth')) {
            return (
                <div>
                    <form action="" onSubmit={this.logout}>
                        <h3>Credenciales</h3>
                        <p>Código: {this.state._id}</p> 
                        <p>Nombre: {this.state.name}</p>  
                        <p>Email: {this.state.email}</p> 
                        <p>Telefono: {this.state.tel}</p>
                        <button type="submit" className="strip1">
                            Cerrar sesión
                        </button>
                    </form>
                </div>
            )
        } else {
            return (
                <div>
                    <form onSubmit={this.onSubmit} className="form">
                        <h3>Ingresa tus credenciales</h3>
                        <main>
                            <input type="number" onChange={this.onInputChange} name="usernumber" required autoFocus/>
                            <label htmlFor="usernumber" className="label-name">
                                <span className="content-name">Código de usuario</span>
                            </label>
                        </main>
                        <main>
                            <input type="password" onChange={this.onInputChange} name="pass" required/>
                            <label htmlFor="pass" className="label-name">
                                <span className="content-name">Contraseña</span>
                            </label>
                        </main>
                        <button type="submit" className="strip1">
                        Siguiente
                    </button>
                    </form>
                </div>
            )
        }
    }
}
