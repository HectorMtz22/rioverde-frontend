import React, { Component } from 'react'
import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
const apiProducts = api + '/products/apiproductos.php';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export default class Stock extends Component {
    state = {
        table: [],
    }

    async componentDidMount() {
        //const res = await axios.get(apiProducts);
        //this.setState({table: res.data});
        this.getProducts();
    }

    async getProducts() {
        const res = await axios.get(apiProducts, {
            headers: headers
        });
        if(res.data.items) {
            this.setState({
                table: res.data.items
            });
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
        let state = this.state;
        delete state.table;
        let stockdata = {_id : state};
        stockdata.method = "PUT";
        stockdata.stock = "ASIES";
        //console.log(stockdata);
        await axios.post(apiProducts, stockdata);
        //console.log(res);
        window.location="/products";
    }

    render() {
        return (
            <div>
                <h1 className="title">Stock</h1>
                <main className="table-3">
                    <section>Código</section>
                    <section>Nombre</section>
                    <section>Stock</section>
                </main>
                {
                    this.state.table.map((product) => (
                        <main className="table-3" key={product._id}>
                            <section>{product._id}</section>
                            <section>{product.name}</section>
                            <form className="form stock">
                                <main>
                                    <input type="number" name={product._id} onChange={this.onInputChange} defaultValue={product.total} required autoFocus/>
                                    <label htmlFor="cant" className="label-name">
                                        <span className="content-name">Cant</span>
                                    </label>
                                </main>
                            </form>
                        </main>
                    ))
                }
                <form onSubmit={this.onSubmit} className="nav">
                    <button type="submit" className="button strip1">
                        <span>Confirmar</span>
                    </button>
                </form>
            </div>
        )
    }
}
