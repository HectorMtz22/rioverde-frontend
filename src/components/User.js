import React, { Component } from 'react'
import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
const apiLoginUser = api + '/users/login';

export default class User extends Component {
    state = {
        numberUser : '',
        pass : ''
    }
    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit = async (e) => {
        e.preventDefault();
        const loginUser = {
            numberUser: this.state.numberUser,
            pass: this.state.pass
        };
        console.log(loginUser);
        await axios.post(apiLoginUser, loginUser);
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                <h3>Ingresa tus credenciales</h3>
                <input type="number" onChange={this.onInputChange} name="numberUser" placeholder="Ingresa el número de usuario" autoFocus/>
                <input type="number" onChange={this.onInputChange} name="pass" placeholder="Ingresa la contraseña"/>
                <button type="submit" className="strip">
                    Siguiente
                </button>
            </form>
            </div>
        )
    }
}
