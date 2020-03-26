import React, { Component } from 'react'
import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
const apiProduct = api + '/products/apiproductos.php';

//const apiProductUpdate = api + '/products/apiproductos.php/?_id=';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export default class CreateProduct extends Component {
    state = {
        _id: '',
        name: '',
        brand: '',
        price: '',
        total: '',
        editing: false
    }

    async componentDidMount() {
        if(this.props.match.params) {
            const envio = {
                "method" : "GET",
                "_id" : this.props.match.params.id
            }
            const res = await axios.post(apiProduct, envio, {
                headers: headers
            });
            this.setState({
                _id: this.props.match.params.id,
                name: res.data.name,
                brand: res.data.brand,
                price: res.data.price,
                total: res.data.total
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
            const updateProduct = {
                method: "PUT",
                _id: this.state._id,
                name: this.state.name,
                brand: this.state.brand,
                price: this.state.price,
                total: this.state.total
            };
            //await axios.put(apiProduct + this.state._id, newProduct);
            await axios.post(apiProduct, updateProduct, {
                headers: headers
            });
            window.location.href="/products";
        } else {
            const newProduct = {
                method: "POST",
                _id: this.state._id,
                name: this.state.name,
                brand: this.state.brand,
                price: this.state.price,
                total: this.state.total
            };
            await axios.post(apiProduct, newProduct, {
                headers: headers
            });
            window.location.href = "/products";
        }
        //this.setState({redirect: true});
        //window.location.href = '/';
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h3>Producto</h3>
                    <input type="number" onChange={this.onInputChange} name="_id" placeholder="Código" value={this.state._id} required autoFocus/>
                    <input type="text" onChange={this.onInputChange} name="name" placeholder="Nombre" value={this.state.name} required/>
                    <input type="text" onChange={this.onInputChange} name="brand" placeholder="Marca" value={this.state.brand} required/>
                    <input type="number" onChange={this.onInputChange} name="price" placeholder="Precio" value={this.state.price} required/>
                    <input type="number" onChange={this.onInputChange} name="total" placeholder="Total" value={this.state.total} required/>
                    <button type="submit" className="strip1" onSubmit={this.onSubmit}>
                        Guardar
                    </button>
                </form>
            </div>
        )
    }
}
