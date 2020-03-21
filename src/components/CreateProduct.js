import React, { Component } from 'react'
import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
const apiProduct = api + 'products/';

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
        total: ''
    }

    async componentDidMount() {
        if(this.props.match.params) {
            const res = await axios.get(apiProduct + this.props.match.params.id, {
                headers: headers
            });
            //console.log(res.data)
            this.setState({
                _id: this.props.match.params.id,
                name: res.data.items.name,
                brand: res.data.items.brand,
                price: res.data.items.price,
                total: res.data.items.total
            })
        }
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
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
                    <button type="submit" className="strip1">
                        Guardar
                    </button>
                </form>
            </div>
        )
    }
}
