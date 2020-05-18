import React, { Component } from 'react'
import axios from 'axios';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from "date-fns/locale/es";

import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

registerLocale("es", es);

const api = process.env.REACT_APP_API_URL;
//const apiSales = api + '/sales/apiventas.php';
const apiProducts = api + '/products/apiproductos.php';
const apiOutputs = api + '/outputs/apisalidas.php';
const apiSales = api + '/sales/apiventas.php';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

let table = [];
//let values = {};

const today = new Date();
const day = today.getDate();
const day2 = today.getDate() + 1;
const month = today.getMonth() + 1;
const year = today.getFullYear();
const string1 = year + "-" + month + "-" + day;
const string2 = year + "-" + month + "-" + day2;

export default class Output extends Component {
    state = {
        products: [],
        outputs: [],
        table: [],
        profits: 0,
        dateStart: new Date(string1).getTime(),
        dateEnd: new Date(string2).getTime(),
        date: new Date(string1).getTime()
    }
    async componentDidMount() {
        // Parametros que configuran datePicker
        const datePicker = document.getElementsByClassName("react-datepicker__input-container")[0];
        datePicker.childNodes[0].setAttribute("readOnly", true);
        // Axios para traer la info de los productos y de las fechas
        await this.getProducts();
        const dateStart = new Date(string1).getTime();
        const dateEnd = new Date(string2).getTime();
        await this.getOutputs(dateStart, dateEnd);
        await this.getProfits(dateStart, dateEnd);
    }

    async getProfits(dateStart, dateEnd) {
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

    async getProducts() {
        const res = await axios.get(apiProducts, {
            headers: headers
        });
        if (res.data.items) {
            this.setState({ products: res.data.items });
        }
        if (res.data.mensaje) {
            alert(res.data.mensaje);
        }
    }

    async getOutputs(dateStart, dateEnd) {
        const dates = {
            dateStart: Math.floor(dateStart / 1000),
            dateEnd: Math.floor(dateEnd / 1000)
        }
        const outputs = await axios.post(apiOutputs, dates, {
            headers: headers
        });
        if (outputs.data.items) {
            this.setState({ outputs: outputs.data.items });
            const outputArray = outputs.data.items;
            table.splice(0, table.length);
            for (let i = 0; i < outputArray.length; i++) {
                const output = outputArray[i];
                const product = this.state.products;
                for (let a = 0; a < product.length; a++) {
                    if (output.idProduct === product[a]._id) {
                        const fecha = (today) => {
                            const day = today.getDate();
                            const month = today.getMonth() + 1;
                            const year = today.getFullYear();
                            const string1 = day + "/" + month + "/" + year;
                            return string1;
                        }
                        const fechaValor = fecha(new Date(output.idDate * 1000));
                        const valores = {
                            _id: i,
                            idDate: fechaValor,
                            idProduct: output.idProduct,
                            name: product[a].name,
                            price: product[a].price,
                            cant: output.cant,
                            total: product[a].price * output.cant
                        }
                        table.push(valores);
                    }
                }
            }
            this.setState({ table: table });
            console.log(table);
        } else {
            this.setState({ table: [] });
        }
        if (outputs.data.mensaje) {
            alert(outputs.data.mensaje);
        }
    }

    handleChangeStart = e => {
        const date = e.getTime();
        let dateEnd = this.state.dateEnd;
        this.setState({ dateStart: date });
        if (date >= dateEnd) {
            this.setState({ dateEnd: date });
            dateEnd = date;
        }
        this.getOutputs(date, dateEnd);
        this.getProfits(date, dateEnd);
    }
    handleChangeEnd = e => {
        const date = e.getTime();
        let dateStart = this.state.dateStart;
        this.setState({ dateEnd: date });
        if (date < dateStart) {
            this.setState({ dateStart: date });
            dateStart = date;
        }
        this.getOutputs(dateStart, date);
        this.getProfits(dateStart, date);
    }

    render() {
        return (
            <div className="output">
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
                        maxDate={this.state.date + 86400000}
                        dateFormat="dd/MM/yyyy"
                        todayButton="Hoy"
                        locale="es"
                        withPortal
                    />
                </main>
                <main className="table-5">
                    <section>Fecha</section>
                    <section>Nombre</section>
                    <section>Precio</section>
                    <section>Cantidad</section>
                    <section>Total</section>
                </main>
                {
                    this.state.table.map((table) => (
                        <main className="table-5" key={table._id}>
                            <section>{table.idDate}</section>
                            <section>{table.name}</section>
                            <section>{table.price}</section>
                            <section>{table.cant}</section>
                            <section>{table.total}</section>
                        </main>
                    ))
                }
                <ExcelFile element={<button className="button strip1">Generar Excel</button>}>
                    <ExcelSheet data={table} name="Mes" >
                        <ExcelColumn label="Fecha" value="idDate"/>
                        <ExcelColumn label="Producto" value="idProduct"/>
                        <ExcelColumn label="Nombre" value="name"/>
                        <ExcelColumn label="Precio Unitario" value="price"/>
                        <ExcelColumn label="Cantidad" value="cant"/>
                        <ExcelColumn label="Total" value="total"/>
                    </ExcelSheet>
                </ExcelFile>
                <main className="profits">
                    <span>La ganancia es: {this.state.profits}</span>
                </main>
            </div>
        )
    }
}
