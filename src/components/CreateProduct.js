import React, { Component } from 'react'
import axios from 'axios';

const api = process.env.REACT_APP_API_URL;
const apiProduct = api + '/products/apiproductos.php';
const apiVendors = api + '/vendors/apiproveedores.php';

//const apiProductUpdate = api + '/products/apiproductos.php/?_id=';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export default class CreateProduct extends Component {
    state = {
        _id: '',
        name: '',
        brand: [],
        table: [],
        products: [],
        buy: '',
        price: '',
        total: '',
        editing: false
    }

    async componentDidMount() {
        await this.getVendors();
        await this.getProducts();
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
                buy: res.data.buy,
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

    async getVendors() {
        const res = await axios.get(apiVendors, {
            headers: headers
        });
        //console.log(res.data.mensaje);
        if(res.data.items) {
            this.setState({table: res.data.items});
            this.setState({nameVendor: this.state.table})
        }
        if(res.data.mensaje) {
            alert("Para iniciar, registra una marca");
            window.location = "/vendors";
        }
    }

    async getProducts() {
        const res = await axios.get(apiProduct, {
            headers: headers
        });
        if(res.data.items) {
            this.setState({products: res.data.items});
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
        const products = this.state.products;
        for(let i = 0; i < products.length; i++) {
            if(products[i]._id === this.state._id) {
                alert("Código ya existente");
                return 0;
            }
        }
        if (this.state.editing) {
            const updateProduct = {
                method: "PUT",
                _id: this.state._id,
                name: this.state.name,
                brand: this.state.brand,
                buy: this.state.buy,
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
                buy: this.state.buy,
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
                <form onSubmit={this.onSubmit} className="form">
                    <h3>Producto</h3>
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
                        <select className="text" name="brand" onChange={this.onInputChange} value={this.state.brand} required>
                            <option>(Selecciona una marca)</option>
                            {
                                this.state.table.map(vendor =>
                                    <option key={vendor.name} value={vendor.name}>
                                        {vendor.name}
                                    </option>)
                            }
                        </select>
                        <label htmlFor="title" className="label-name:valid">
                            <span className="content-name:valid">Materia</span>
                        </label>
                    </main>
                    <main>
                        <input type="number" onChange={this.onInputChange} name="buy" value={this.state.buy} required/>
                        <label htmlFor="buy" className="label-name">
                            <span className="content-name">Compra</span>
                        </label>
                    </main>
                    <main>
                        <input type="number" onChange={this.onInputChange} name="price" value={this.state.price} required/>
                        <label htmlFor="price" className="label-name">
                            <span className="content-name">Venta</span>
                        </label>
                    </main>
                    <main>
                        <input type="number" onChange={this.onInputChange} name="total" value={this.state.total} required/>
                        <label htmlFor="total" className="label-name">
                            <span className="content-name">Stock</span>
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
