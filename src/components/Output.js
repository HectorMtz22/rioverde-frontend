import React, { Component } from 'react'
import axios from 'axios';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from "date-fns/locale/es";

registerLocale("es", es);

const api = process.env.REACT_APP_API_URL;
//const apiSales = api + '/sales/apiventas.php';
const apiProducts = api + '/products/apiproductos.php';
const apiOutputs = api + '/outputs/apisalidas.php';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export default class Output extends Component {
    state = {
        products : [],
        date: new Date().getTime()
    }
    async componentDidMount () {
        this.setState({
            dateStart: this.state.date,
            dateEnd: this.state.date
        })
        // Parametros que configuran datePicker
        const datePicker=document.getElementsByClassName("react-datepicker__input-container")[0];
        datePicker.childNodes[0].setAttribute("readOnly",true);        
        // Axios para traer la info de los productos y de las fechas
        this.getProducts();
        this.getOutputs();
    }

    async getProducts() {
        const res = await axios.get(apiProducts, {
            headers: headers
        });
        if(res.data.items) {
            this.setState({products: res.data.items});
        }
        if(res.data.mensaje) {
            alert(res.data.mensaje);
        }
    }

    async getOutputs() {
        const dateStart = this.state.dateStart;
        const dateEnd = this.state.dateEnd;
        const dates = {
            dateStart: Math.floor(dateStart / 1000),
            dateEnd: Math.floor(dateEnd / 1000)
        }
        const outputs = await axios.post(apiOutputs, dates, {
            headers: headers
        });
        console.log(outputs.data);
    }

    handleChangeStart = e => {
        const date = e.getTime(); 
        const dateEnd = this.state.dateEnd;
        this.setState({dateStart: date});
        if(date > dateEnd) {
            this.setState({dateEnd: date});
        }
        this.getOutputs();
    }
    handleChangeEnd = e => {
        const date = e.getTime();
        const dateStart = this.state.dateStart;
        this.setState({dateEnd: date});
        if(date < dateStart) {
            this.setState({dateStart: date});
        }
        this.getOutputs();
    }

    render() {
        return (
            <div className="sales">
                <h1>Salidas</h1>
                <main className="dates">
                    <label htmlFor="dateStart">Inicio:</label>
                    <DatePicker 
                        name="dateStart" 
                        className="datepicker" 
                        selected={this.state.dateStart} 
                        onChange={this.handleChangeStart}
                        maxDate={this.state.date}
                        dateFormat="dd/MM/yyyy" 
                        todayButton="Hoy"
                        locale="es"
                        withPortal  
                    />
                    <label htmlFor="dateEnd">Fin:</label>
                    <DatePicker 
                        name="dateEnd" 
                        className="datepicker" 
                        selected={this.state.dateEnd} 
                        onChange={this.handleChangeEnd} 
                        maxDate={this.state.date} 
                        dateFormat="dd/MM/yyyy" 
                        todayButton="Hoy"
                        locale="es"
                        withPortal 
                    />
                </main>
                <main className="table-5">
                    <section>Código</section>
                    <section>Nombre</section>
                    <section>Precio</section>
                    <section>Cantidad</section>
                    <section>Total</section>
                </main>
                {
                    this.state.products.map((product) => (
                        <main className="table-5" key={product._id}>
                            <section>{product._id}</section>
                            <section>{product.name}</section>
                            <section>{product.price}</section>
                            <section>{product.cant}</section>
                            <section>{product.total}</section>
                        </main>
                    ))
                }
            </div>
        )
    }
}
