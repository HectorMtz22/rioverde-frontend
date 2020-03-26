import React, { Component } from 'react'
import Axios from 'axios';

const api = process.env.REACT_APP_API_URL;
const apiLoginUser = api + '/users/login';

export default class User extends Component {
    state = {
        numberUser : '',
        pass : ''
    }
    componentDidMount() {
        const date = new Date();
        console.log(date.getTime());
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
        await Axios.post(apiLoginUser, loginUser);
        window.location = "/sales";
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                <h3>Ingresa tus credenciales</h3>
                <input type="number" onChange={this.onInputChange} name="numberUser" placeholder="Ingresa el número de usuario" required autoFocus/>
                <input type="number" onChange={this.onInputChange} name="pass" placeholder="Ingresa la contraseña" required/>
                <button type="submit" className="strip1">
                    Siguiente
                </button>
            </form>
            </div>
        )
    }
}
