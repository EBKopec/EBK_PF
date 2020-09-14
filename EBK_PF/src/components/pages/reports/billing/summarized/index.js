import React, { Component } from 'react';
import Select from 'react-select';
import Tabs from '../../../../tabs/tabs';
import Detail from '../detailed/index';
import Currency from 'react-currency-format';
import Data from '../../../../services/api';
import Banner from '../../../../banner/index';
import { checkArray } from '../../../../utils/utils';
import './styles.css';

const file = [
    { value: 'PDF_R', label: 'Pdf' },
    { value: 'XLSX_R', label: 'Excel' }
]
// const year = [
//     { value: 2015, label: 2015 },
//     { value: 2016, label: 2016 },
//     { value: 2017, label: 2017 },
//     { value: 2018, label: 2018 },
//     { value: 2019, label: 2019 },
//     { value: 2020, label: 2020 }
// ];
// const month = [
//     { value: 1, label: 'Janeiro' },
//     { value: 2, label: 'Fevereiro' },
//     { value: 3, label: 'Março' },
//     { value: 4, label: 'Abril' },
//     { value: 5, label: 'Maio' },
//     { value: 6, label: 'Junho' },
//     { value: 7, label: 'Julho' },
//     { value: 8, label: 'Agosto' },
//     { value: 9, label: 'Setembro' },
//     { value: 10, label: 'Outubro' },
//     { value: 11, label: 'Novembro' },
//     { value: 12, label: 'Dezembro' }];


export default class Billing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedYear: new Date().getFullYear(),
            selectedMonth: parseInt(new Date().getMonth()) + 1,
            year: null,
            month: null,
            selectedFile: null,
            download: null,
            info: [],
            resume_consume: [],
            total: 0,
            total_ext: 0,
            total_llm: 0,
            total_exc: 0,
            total_min: 0,
            total_ldn_min: 0,
            total_local_min: 0,
            total_movel_min: 0,
            page: 1,
            file,
            // loadContent: null
        }
    };
    componentDidMount() {
        const { selectedFile } = this.state;
        this.loadYearMonth();

        this.setState({ selectedFile });

    }


    loadYearMonth = async () => {
        let ano = [];
        let mes = [];
        const resp_Y = await Data.get(`/year`);
        const resp_M = await Data.get(`/month`);

        // console.log(resp_Y, resp_M)
        ano = resp_Y.data.map((id_ano) => { return { value: id_ano.id_ano, label: id_ano.id_ano } });
        mes = resp_M.data.map((id_mes) => { return { value: id_mes.id_mes, label: id_mes.mes } });
        // console.log('ano, mes', ano, mes);
        this.setState({ year: ano, month: mes });
    }

    yearChange = selectedYear => {
        this.setState({ selectedYear });
        console.log(`Year Selected: `, selectedYear);
    };
    monthChange = selectedMonth => {
        this.setState({ selectedMonth });
        console.log(`Month Selected: `, selectedMonth);
    };

    fileChange = selectedFile => {
        this.setState({ selectedFile });
        console.log(`File Selected: `, selectedFile);
    }

    resetRequest = () => {
        const loadContent = false;
        this.setState({ loadContent });
    }

    handleSubmit = async e => {
        const { selectedYear, selectedMonth } = this.state;
        // console.log('aqui', this);

        const response = await Data.get(`/resumeConsume/${selectedYear.value}${selectedMonth.value}`);
        const { data } = response;
        // console.log(response);
        try {
            checkArray(data);
            // console.log(data);
        } catch (err) {
            console.log('Erro', err);
            return alert(`Não há dados processados para o mês de ${selectedMonth.label} de ${selectedYear.value}!`);
        }
        // console.log(this.state.content);
        // this.download();
        this.setState({ resume_consume: data, selectedYear, selectedMonth, loadContent: true });
        this.total();
        this.mapping();
    }

    // download = () => {
    //     const { selectedFile, file } = this.state;
    //     const download = (
    //         <div className="download">
    //             <Select
    //                 className="selectedFile"
    //                 value={selectedFile}
    //                 onChange={this.fileChange}
    //                 options={file}
    //                 placeholder="Selecione o Mês"
    //                 isSearchable />
    //             <button className="download" onClick={this.handleDownload}>Download</button>
    //         </div>
    //     )
    //     this.setState({ download, selectedFile });
    // }

    handleDownload = async e => {
        const { selectedYear, selectedMonth, selectedFile } = this.state;
        console.log('State', this.state);
        if (!selectedYear || !selectedMonth || !selectedFile) {
            alert("Escolha um formato para download!");
        } else {
            const year = String(selectedYear.value);
            const month = String(selectedMonth.value);
            const file = String(selectedFile.value);
            try {
                Data({
                    url: `/download/${file}/${year}${month}`, //your url
                    method: 'GET',
                    responseType: 'blob', // important
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `Files_${year}${month}.zip`); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                }).catch((err) => {
                    console.log(err);
                    return alert(`Não há dados processados para o mês de ${selectedMonth.label} de ${selectedYear.value}!`);
                });
                this.setState({ selectedFile })
            } catch (err) {
                console.log(err);
            }
        }
    }


    mapping = () => {
        // console.log("Content", this.state);
        const response = (this.state.resume_consume.map((info) => (
            <article className="sec" key={info.id}>
                <div className="header">
                    <h5>{info.group}</h5>
                    <ul className="lst">
                        <li>Serviços: STFC</li>
                        <li>Ramais: {info.ramal_ativo}</li>
                        <li>Total Ramais: {this.mask(info.faturar_ramais, ",", "R$ ", ".")}</li>
                        <li>Total Serviço: {this.mask(info.total_faturar, ",", "R$ ", ".")}</li>
                    </ul>
                </div>
                <hr />
                <div className="plan">
                    <table className="tbl">
                        <thead className="hd">
                            <tr>
                                <td colSpan="5">Franquias/Excedentes</td>
                            </tr>
                            <tr>
                                <th></th>
                                <th>Minutos</th>
                                <th>Valores</th>
                                <th>Minutos Excedentes</th>
                                <th>Valores Excedentes</th>
                            </tr>
                        </thead>
                        <tbody className="bodyT">
                            <tr>
                                <td>Local</td>
                                <td>{this.mask(info.local_minutes, ":", " ")}</td>
                                <td>{this.mask(info.local_values, ",", "R$ ", ".")}</td>
                                <td>{this.mask(info.local_minutes_exc, ":", " ")}</td>
                                <td>{this.mask(info.local_values_exc, ",", "R$ ", ".")}</td>

                            </tr>
                            <tr>
                                <td>LDN</td>
                                <td>{this.mask(info.ldn_minutes, ":", " ")}</td>
                                <td>{this.mask(info.ldn_values, ",", "R$ ", ".")}</td>
                                <td>{this.mask(info.ldn_minutes_exc, ":", " ")}</td>
                                <td>{this.mask(info.ldn_values_exc, ",", "R$ ", ".")}</td>
                            </tr>
                            <tr>
                                <td>Móvel</td>
                                <td>{this.mask(info.movel_minutes, ":", " ")}</td>
                                <td>{this.mask(info.movel_values, ",", "R$ ", ".")}</td>
                                <td>{this.mask(info.movel_minutes_exc, ":", " ")}</td>
                                <td>{this.mask(info.movel_values_exc, ",", "R$ ", ".")}</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>{this.mask(info.local_minutes
                                    + info.ldn_minutes
                                    + info.movel_minutes, ":", " ")}</td>
                                <td>{this.mask(info.local_values
                                    + info.ldn_values
                                    + info.movel_values, ",", "R$ ", ".")}</td>
                                <td>{this.mask(this.secToTime(
                                    this.minutes(info.local_minutes_exc)
                                    + this.minutes(info.ldn_minutes_exc)
                                    + this.minutes(info.movel_minutes_exc)), ":", " ")}</td>
                                <td>{this.mask(info.local_values_exc
                                    + info.ldn_values_exc
                                    + info.movel_values_exc, ",", "R$ ", ".")}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>
        )))

        this.setState({ info: response })
    }

    secToTime = (time) => {
        // recebe o tempo em segundos e depois converto para minutos com o mod
        // concatenando no final
        const min = Math.floor(time / 60);
        const sec = time - min * 60;
        const result = String(min).concat(':', sec)

        return result
    }

    minutes = (time) => {

        const part = (String(time === 0 ? "0.00" : time.toFixed(2))).split('.')
        const min = isNaN(part[0]) ? 0 : parseFloat(part[0]);
        const sec = isNaN(part[1]) ? 0 : parseFloat(part[1]);
        // Isolo e nivelo os minutos para segundos e realizo a soma com os minutos
        const total_sec = (parseInt(min) === 0 ? 0 : (parseInt(min) * 60)) + ((parseInt(sec)) === 0 ? 0 : (parseInt(sec)))
        // retorno todos tudo em segundo
        return total_sec
    }


    total = () => {
        const { resume_consume } = this.state;
        // console.log('Resume_consume', resume_consume);
        const total_geral = (resume_consume.map((ttl) => (ttl.total_faturar)).reduce((tt, next) => (tt + next)))
        const total_ext = (resume_consume.map((ttl) => (ttl.faturar_ramais)).reduce((tt, next) => (tt + next)))
        const total_llm = (resume_consume.map((ttl) => (ttl.local_values
            + ttl.ldn_values
            + ttl.movel_values)).reduce((tt, next) => (tt + next)))
        const total_exc = (resume_consume.map((ttl) => (ttl.local_values_exc
            + ttl.ldn_values_exc
            + ttl.movel_values_exc))).reduce((tt, next) => (tt + next))
        const total_ldn_min = (resume_consume.map((ttl) => (this.minutes(parseFloat(ttl.ldn_minutes_exc))))).reduce((tt, next) => (tt + next))
        const total_local_min = (resume_consume.map((ttl) => (this.minutes(parseFloat(ttl.local_minutes_exc))))).reduce((tt, next) => (tt + next))
        const total_movel_min = (resume_consume.map((ttl) => (this.minutes(parseFloat(ttl.movel_minutes_exc))))).reduce((tt, next) => (tt + next))

        this.setState({
            total: total_geral
            , total_ext: total_ext
            , total_llm: total_llm
            , total_exc: total_exc
            , total_ldn_min
            , total_local_min
            , total_movel_min
        })
    }

    mask = (Value, Decimal, Prefix, TS) => {
        const valor = (<Currency displayType={'text'}
            value={Value}
            thousandSeparator={TS}
            decimalSeparator={Decimal}
            prefix={Prefix}
            decimalScale={2}
            fixedDecimalScale={true} />)
        return valor
    }

    render() {
        const { selectedFile, loadContent, selectedYear, selectedMonth, info, total, total_ext, total_llm, total_exc, total_ldn_min, total_local_min, total_movel_min, year, month } = this.state;
        // console.log(this.state);
        return (
            <div>
                <Banner />
                <div className="main-billing">
                    <h1>Relatório de Faturamento</h1>
                    <div className="finders">
                        <Select
                            className="selectedYear"
                            value={selectedYear}
                            onChange={this.yearChange}
                            options={year}
                            placeholder="Selecione o Ano"
                            isSearchable />
                        <Select
                            className="selectedMonth"
                            value={selectedMonth}
                            onChange={this.monthChange}
                            options={month}
                            placeholder="Selecione o Mês"
                            isSearchable />
                        <button className="findButton" onClick={this.handleSubmit}>Buscar</button>
                        {/* <div className="download"> */}
                        <Select
                            className="selectedFile"
                            value={selectedFile}
                            onChange={this.fileChange}
                            options={file}
                            placeholder="Download"
                            isSearchable />
                        <button className="download" onClick={this.handleDownload}>Download</button>
                        {/* </div> */}

                    </div>
                    <div>
                        <Tabs>
                            <div label="Consolidado">
                                <div className="total">
                                    <h1>Total Geral</h1>
                                    <p>Total Serviços:{this.mask(total, ",", "R$ ", ".")}</p>
                                    <p className="ttl">Total Ramais: {this.mask(total_ext, ",", "R$ ", ".")}</p>
                                    <p className="ttl">Total Franquias: {this.mask(total_llm, ",", "R$ ", ".")}</p>
                                    <p className="ttl">Total Excedentes: {this.mask(total_exc, ",", "R$ ", ".")}</p>
                                    <p className="ttl">Total Minutos: {this.mask(this.secToTime(total_ldn_min + total_local_min + total_movel_min), ":", " ")}</p>
                                </div>
                                <div className="flex">
                                    {info}
                                </div>
                            </div>
                            <div label="Detalhado">
                                <div className="flex">
                                    <Detail selectedYear={selectedYear} selectedMonth={selectedMonth}
                                        loadContent={loadContent} reset={() => this.resetRequest()}
                                    />
                                </div>
                            </div>

                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}