import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const api = process.env.REACT_APP_API_URL;
const apiVendors = api + '/vendors/apiproveedores.php';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export default class Vendors extends Component {
    state = {
        table: [],
    }

    async componentDidMount() {
        //const res = await axios.get(apiVendors);
        //this.setState({table: res.data});
        this.getVendors();
    }

    async getVendors() {
        const res = await axios.get(apiVendors, {
            headers: headers
        });
        //console.log(res.data.mensaje);
        if(res.data.items) {
            this.setState({table: res.data.items});
        }
        if(res.data.mensaje) {
            alert(res.data.mensaje);
        }
    }

    deleteVendor = async (id) => {
        const check = window.confirm('Quieres eliminar el Vendedor');
        if (check) {
            const delVen = {
                "method" : "DELETE",
                "_id" : id
            } 
            //await axios.delete(apiVendors + "/" + delVen);
            await axios.post(apiVendors, delVen, {
                headers: headers
            });
            this.getVendors();
        }
    }

    render() {
        return (
            <div>
                <main className="table-3">
                    <section>Código</section>
                    <section>Nombre</section>
                    <section>Frecuencias</section>
                </main>
                {
                    this.state.table.map((vendor) => (
                        <main className="table-3" key={vendor._id}>
                            <section>{vendor._id}</section>
                            <section>{vendor.name}</section>
                            <section>{vendor.frecuencies}</section>
                            <main className="conticon-left">
                                <Link to={"/vendor/edit/" + vendor._id}>
                                    <img src="/img/edit-button.png" alt="Edit" className="icon"/>
                                </Link>
                            </main>
                            <main className="conticon-right">
                                <img src="/img/check.png" alt="Check" className="icon check" onClick={() => this.deleteVendor(vendor._id)}/>
                            </main>
                        </main>
                    ))
                }
                <main className="nav">
                    <Link to="/create/vendor">
                        <button className="button strip1">
                            <span>Agregar Vendedor</span>
                        </button>
                    </Link>
                </main>
            </div>
        )
    }
}
