import React, { Component } from 'react';
import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
//const apiSales = api + '/sales/apiventas.php';
const apiProduct = api + '/products/apiproductos.php';

export default class Sales extends Component {
    state = {
        _id: '',
        view2: ''
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit1 = async (e) => {
        e.preventDefault();
        const codigo = {
            method : "GET",
            _id : this.state._id
        };
        //console.log(codigo);
        const res = await axios.post(apiProduct, codigo);
        this.setState({
            name : res.data.name,
            brand : res.data.brand,
            price : res.data.price
        })
        if (res.data._id) {
            this.setState({
                view2 : true
            })
        } else {
            alert("Código no encontrado");
            window.location = '/sales';
        }
    }
    render() {
        if (this.state.view2) {
            return (
                <main className="sales">
                    <h1>Venta</h1>
                    <h2>{this.state.name}</h2>
                    <h2>{this.state.brand}</h2>
                    <h2>{this.state.price}</h2>
                </main>
            )
        } else {
            return (
                <main>
                    <form onSubmit={this.onSubmit1}>
                    <h3>Ingresa el código</h3>
                    <input type="number" onChange={this.onInputChange} name="_id" placeholder="Ingresa el código" required autoFocus/>
                    <button type="submit" className="strip1">
                        Siguiente
                    </button>
                </form>
                </main>
            )
        }
    }
}
