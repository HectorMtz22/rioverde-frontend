import React, { Component } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';

const api = process.env.REACT_APP_API_URL;
const apiProducts = api + '/';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export default class Products extends Component {
    state = {
        table: [],
    }

    async componentDidMount() {
        //const res = await Axios.get(apiProducts);
        //this.setState({table: res.data});
        this.getNotes();
    }

    async getNotes() {
        const res = await Axios.get(apiProducts, {
            headers: headers
        });
        //console.log(res.data.items);
        this.setState({table: res.data.items});
    }

    deleteProduct = async (id) => {
        const check = window.confirm('Quieres elimina el producto');
        if (check) {
            await Axios.delete(apiProducts + "/" + id);
            this.getNotes();
        }
    }

    render() {
        return (
            <div>
                <main className="table">
                    <section>Código</section>
                    <section>Nombre</section>
                    <section>Marca</section>
                    <section>Precio</section>
                    <section>Total</section>
                </main>
                {
                    this.state.table.map((product) => (
                        <main className="table" key={product._id}>
                            <section>{product._id}</section>
                            <section>{product.name}</section>
                            <section>{product.brand}</section>
                            <section>{product.price}</section>
                            <section>{product.total}</section>
                            <main className="conticon">
                                <Link to={"/edit/" + product._id}>
                                    <img src="/img/edit-button.png" alt="Edit" className="icon"/>
                                </Link>
                                <img src="/img/check.png" alt="Check" className="icon check" onClick={() => this.deleteProduct(product._id)}/>
                            </main>
                        </main>
                    ))
                }
                <main className="nav">
                    <Link to="/create/product">
                        <button className="button">
                            <span>Agregar Producto</span>
                        </button>
                    </Link>
                </main>
            </div>
        )
    }
}
