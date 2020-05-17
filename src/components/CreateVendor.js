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
        vendors: [],
        frecuencies: '',
        editing: false
    }
    async componentDidMount() {
        await this.getVendors();
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

    async getVendors() {
        const res = await axios.get(apiVendors, {
            headers: headers
        });
        //console.log(res.data.mensaje);
        if(res.data.items) {
            this.setState({vendors: res.data.items});
        }
        if(res.data.mensaje) {
            alert(res.data.mensaje);
        }
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const vendors = this.state.vendors;
        for(let i = 0; i < vendors.length; i++) {
            if(vendors[i]._id === this.state._id) {
                alert("Código ya existente");
                return 0;
            }
        }
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
                <form onSubmit={this.onSubmit} className="form">
                    <h3>Proveedor</h3>
                    <main>
                        <input type="number" onChange={this.onInputChange} name="_id" value={this.state._id} required autoFocus/>
                        <label htmlFor="_id" className="label-name">
                            <span className="content-name">Id</span>
                        </label>
                    </main>
                    <main>
                        <input type="text" onChange={this.onInputChange} name="name" value={this.state.name} required/>
                        <label htmlFor="name" className="label-name">
                            <span className="content-name">Nombre</span>
                        </label>
                    </main>
                    <main>
                        <input type="text" onChange={this.onInputChange} name="frecuencies" value={this.state.frecuencies} required/>
                        <label htmlFor="frecuencies" className="label-name">
                            <span className="content-name">Frecuencias</span>
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
