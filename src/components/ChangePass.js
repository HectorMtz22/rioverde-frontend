import React, { Component } from 'react'
import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
const apiLoginUser = api + '/users/login.php';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export default class ChangePass extends Component {
    state = {
        oldpass: '',
        newPass: '',
        confirmPass: ''
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const pass = {
            method: "PUT",
            change: "pass",
            oldpass: this.state.oldpass,
            newPass: this.state.newPass,
            confirmPass: this.state.confirmPass
        }
        if (pass.newPass !== pass.confirmPass || pass.newPass.length < 8) {
            alert("Las contraseñas no coinciden o no contiene al menos 8 carácteres");
            this.setState({
                pass: '',
                confirmPass: ''
            });
            return 0;
        }
        const res = await axios.post(apiLoginUser, pass, {
            headers: headers
        });
        if(res.data.items) {
            window.location = "/";
        }
        if(res.data.mensaje) {
            alert("Contraseña incorrecta");
            
        }
        console.log(res);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <h3>Modificar Contraseña</h3>
                    <main>
                        <input type="password" onChange={this.onInputChange} name="oldPass" value={this.state.oldPass} required autoFocus/>
                        <label htmlFor="oldPass" className="label-name">
                            <span className="content-name">Contraseña Antigua</span>
                        </label>
                    </main>
                    <main>
                        <input type="password" onChange={this.onInputChange} name="newPass" value={this.state.newPass} required/>
                        <label htmlFor="newPass" className="label-name">
                            <span className="content-name">Contraseña Nueva</span>
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
