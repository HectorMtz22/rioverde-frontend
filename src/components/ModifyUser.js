import React, { Component } from 'react'
import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
const apiLoginUser = api + '/users/login.php';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export default class ModifyUser extends Component {
    state = {
        _id: '',
        name: '',
        email: '',
        tel: ''
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
        const user = {
            method: "PUT",
            change: "user",
            id: this.state._id,
            name: this.state.name,
            email: this.state.email,
            tel: this.state.tel
        }
        await axios.post(apiLoginUser, user, {
            headers: headers
        });
        window.location="/";
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
                    <button type="submit" className="strip1" onSubmit={this.onSubmit}>
                        Guardar
                    </button>
                </form>
            </div>
        )
    }
}
