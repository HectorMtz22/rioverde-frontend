import React, { Component } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';

const api = process.env.REACT_APP_API_URL;
//const apiSales = api + '/sales/apiventas.php';
const apiProduct = api + '/products/apiproductos.php';
const apiSales = api + '/sales/apiventas.php';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

const products = [];

const today = new Date();
const day = today.getDate();
const day2 = today.getDate() + 1;
const month = today.getMonth() + 1;
const year = today.getFullYear();
const string1 = year + "-" + month + "-" + day;
const string2 = year + "-" + month + "-" + day2;

export default class Sales extends Component {
    state = {
        _id: '',
        cant: '',
        view2: '',
        totales : 0,
        pay : false,
        profits: 0
    }

    async componentDidMount () {
        const dateStart = new Date(string1).getTime();
        const dateEnd = new Date(string2).getTime();
        const dates = {
            dateStart: Math.floor(dateStart / 1000),
            dateEnd: Math.floor(dateEnd / 1000)
        }
        const res = await axios.post(apiSales, dates, {
            headers: headers
        });
        this.setState({
            profits: res.data.profits
        })
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
                view2 : true,
                pay: true
            })
        } else {
            alert("Código no encontrado");
            this.setState({
                _id : ''
            })
        }
    }

    onSubmit2 = async (e) => {
        e.preventDefault();
        const total = this.state.price * this.state.cant;
        const valores = {
            _id : this.state._id,
            name : this.state.name,
            brand : this.state.brand,
            price : this.state.price,
            cant : this.state.cant,
            total : total
        }
        products.push(valores);
        let totales = 0;
        for (var i=0; i<products.length; i++) {
            totales = totales + products[i].total;
        }
        this.setState({
            _id : '',
            view2 : false,
            totales : totales
        })
    } 

    onSubmit3 = async (e) => {
        e.preventDefault();
        const dateConverted = Math.floor(Date.now() / 1000);
        for (let i = 0; i < products.length; i++) {
            products[i].idDate = dateConverted;
        }
        const sale = {
            method : "POST",
            idDate : dateConverted,
            priceTotal : this.state.totales,
            products: products
        }
        //console.log(sale);
        await axios.post(apiSales, sale);
        window.location="/sales";
    }

    onSubmitCantidad = async (e) => {

    }
    onCancel = async (e) => {
        window.location = "/sales";
    }

    render() {
        if (this.state.view2) {
            return (
                <div className="sales">
                    <h1>Venta</h1>
                    <main className="table-5">
                        <section>Código</section>
                        <section>Nombre</section>
                        <section>Precio</section>
                        <section>Cantidad</section>
                        <section>Total</section>
                    </main>
                    {
                        products.map((product) => (
                            <main className="table-5" key={product._id}>
                                <section>{product._id}</section>
                                <section>{product.name}</section>
                                <section>{product.price}</section>
                                <section>{product.cant}</section>
                                {
                                    /* NO USAR HASTA QUE SE CONOZCA EL BUG
                                    <form onSubmit={this.onSubmitCantidad} className="sales-cantidad">
                                        <input type="number" name="cant" placeholder={product.cant} onChange={this.onInputChange} autoFocus/>
                                    </form>
                                    */
                                }
                                <section>{product.total}</section>
                            </main>
                        ))
                    }
                    <main className="table-5">
                        <section>{this.state._id}</section>
                        <section>{this.state.name}</section>
                        <section>{this.state.price}</section>
                        <section>
                            <form onSubmit={this.onSubmit2} className="form sales-cantidad">
                                <main>
                                    <input type="number" name="cant" onChange={this.onInputChange} required autoFocus/>
                                    <label htmlFor="cant" className="label-name">
                                        <span className="content-name">Cant</span>
                                    </label>
                                </main>
                            </form>
                        </section>
                    </main>
                    <div className="totales">
                        <section>{this.state.totales}</section>    
                    </div>
                </div>
            )
        } else {
            if(products[0]) {
                return (
                    <main>
                        <form onSubmit={this.onSubmit1} className="form">
                            <h3>Venta</h3>
                            <main>
                                <input type="number" onChange={this.onInputChange} name="_id" value={this.state._id} required autoFocus/>
                                <label htmlFor="_id" className="label-name">
                                    <span className="content-name">Código del producto</span>
                                </label>
                            </main>
                            <button type="submit" className="strip1">
                                Siguiente
                            </button>
                        </form>
                        <form onSubmit={this.onSubmit3}>
                            <h2>Total: {this.state.totales}</h2>
                            <button className="button strip1">
                                Efectuar pago
                            </button>
                            <button onClick={this.onCancel} className="button strip1">
                                Cancelar
                            </button>
                        </form>
                    </main>
                )
            }
            return (
                <main>
                    <form onSubmit={this.onSubmit1} className="form">
                        <h3>Producto</h3>
                        <main>
                            <input type="number" onChange={this.onInputChange} name="_id" value={this.state._id} required autoFocus/>
                            <label htmlFor="_id" className="label-name">
                                <span className="content-name">Código del producto</span>
                            </label>
                        </main>
                        <button type="submit" className="strip1">
                            Siguiente
                        </button>
                    </form>
                    <main className="profits">
                        <span>La ganancia es: {this.state.profits}</span>
                    </main>
                </main>
            )
        }
    }
}
