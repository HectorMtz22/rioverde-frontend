import React, { Component } from 'react';
import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
const apiVendors = api + '/vendors/apiproveedores.php';

//const apiVendorsUpdate = api + '/products/apiproductos.php/?_id=';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export default class CreateVendor extends Component {
    state = {
        _id: '',
        name: '',
        frecuencies: '',
        editing: false
    }
    async componentDidMount() {
        if(this.props.match.params) {
            const envio = {
                "method" : "GET",
                "_id" : this.props.match.params.id
            }
            const res = await axios.post(apiVendors, envio, {
                headers: headers
            });
            this.setState({
                _id: this.props.match.params.id,
                name: res.data.name,
                frecuencies: res.data.frecuencies
            });
            if (res.data._id) {
                this.setState({
                    editing: true
                });
                //console.log("ESTO ES EDITAR");
            }
        }
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            const updateVendor = {
                method: "PUT",
                _id: this.state._id,
                name: this.state.name,
                frecuencies: this.state.frecuencies
            };
            //await axios.put(apiVendors + this.state._id, updateVendor);
            await axios.post(apiVendors, updateVendor, {
                headers: headers
            });
            window.location.href="/vendors";
        } else {
            const newVendor = {
                method: "POST",
                _id: this.state._id,
                name: this.state.name,
                frecuencies: this.state.frecuencies
            };
            await axios.post(apiVendors, newVendor, {
                headers: headers
            });
            window.location.href = "/vendors";
        }
        //this.setState({redirect: true});
        //window.location.href = '/';
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h3>Proveedor</h3>
                    <input type="number" onChange={this.onInputChange} name="_id" placeholder="ID" value={this.state._id} required autoFocus/>
                    <input type="text" onChange={this.onInputChange} name="name" placeholder="Nombre" value={this.state.name} required/>
                    <input type="text" onChange={this.onInputChange} name="frecuencies" placeholder="Frecuencias" value={this.state.frecuencies} required/>
                    <button type="submit" className="strip1" onSubmit={this.onSubmit}>
                        Guardar
                    </button>
                </form>
            </div>
        )
    }
}
