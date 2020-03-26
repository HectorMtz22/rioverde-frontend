import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const api = process.env.REACT_APP_API_URL;
const apiProducts = api + '/products/apiproductos.php';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export default class Products extends Component {
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
            this.setState({table: res.data.items});
        }
        if(res.data.mensaje) {
            alert(res.data.mensaje);
        }
    }

    deleteProduct = async (id) => {
        const check = window.confirm('Quieres eliminar el producto');
        if (check) {
            const delPro = {
                "method" : "DELETE",
                "_id" : id
            } 
            //await axios.delete(apiProducts + "/" + delPro);
            await axios.post(apiProducts, delPro, {
                headers: headers
            });
            this.getProducts();
        }
    }

    render() {
        return (
            <div>
                <main className="table-5">
                    <section>Código</section>
                    <section>Nombre</section>
                    <section>Marca</section>
                    <section>Precio</section>
                    <section>Total</section>
                </main>
                {
                    this.state.table.map((product) => (
                        <main className="table-5" key={product._id}>
                            <section>{product._id}</section>
                            <section>{product.name}</section>
                            <section>{product.brand}</section>
                            <section>{product.price}</section>
                            <section>{product.total}</section>
                            <main className="conticon-left">
                                <Link to={"/product/edit/" + product._id}>
                                    <img src="/img/edit-button.png" alt="Edit" className="icon"/>
                                </Link>
                            </main>
                            <main className="conticon-right">
                                <img src="/img/check.png" alt="Check" className="icon check" onClick={() => this.deleteProduct(product._id)}/>
                            </main>
                        </main>
                    ))
                }
                <main className="nav">
                    <Link to="/create/product">
                        <button className="button strip1">
                            <span>Agregar Producto</span>
                        </button>
                    </Link>
                </main>
            </div>
        )
    }
}
