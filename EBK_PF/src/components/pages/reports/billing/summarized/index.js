import React, {Component} from 'react';
import Select from 'react-select';
import Tabs from '../../../../tabs/tabs';
import Detail from '../detailed/index';
import Currency from 'react-currency-format';
import Data from './data.json';
import './styles.css';


const year = [
    {value: 2015, label:2015},
    {value: 2016, label:2016},
    {value: 2017, label:2017},
    {value: 2018, label:2018},
    {value: 2019, label:2019},
    {value: 2020, label:2020}
];
const month = [
                {value:1,   label:'Janeiro'},
                {value:2,   label:'Fevereiro'},
                {value:3,   label:'Março'},
                {value:4,   label:'Abril'},
                {value:5,   label:'Maio'},
                {value:6,   label:'Junho'},
                {value:7,   label:'Julho'},
                {value:8,   label:'Agosto'},
                {value:9,   label:'Setembro'},
                {value:10,  label:'Outubro'},
                {value:11,  label:'Novembro'},
                {value:12,  label:'Dezembro'}];


export default class Billing extends Component {
    state = {
        selectedYear: null,
        selectedMonth: null,
        info: [],
        total: 0,
        total_ext: 0,
        total_llm: 0,
        total_exc: 0,
        total_min: 0,
        page: 1,
    };
    componentDidMount(){
        this.mapping();
        this.total();
    }

    yearChange = selectedYear =>{
        this.setState({ selectedYear });
        console.log(`Year Selected: `, selectedYear);
    };
    monthChange = selectedMonth =>{
        this.setState({ selectedMonth });
        console.log(`Month Selected: `, selectedMonth);
    };
    mapping = () =>{
        const response = (Data.docs.map((info) => (
            <article className="sec" key={info.id}>
                        <div className="header">
                        <h5>{info.group}</h5>
                            <ul className="lst">
                                <li>Serviços: {info.service}</li>
                                <li>Ramais: {info.ext}</li>
                                <li>Total Ramais: {this.mask(info.total,",","R$ ",".")}</li>
                                <li>Total Serviço: {this.mask(info.total_STFC,",","R$ ",".")}</li>
                            </ul>
                        </div>
                        <hr/>
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
                                        <td>{this.mask(info.local_minutes,":"," ")}</td>
                                        <td>{this.mask(info.local_values,",","R$ ",".")}</td>
                                        <td>{this.mask(info.local_minutes_exc,":"," ")}</td>
                                        <td>{this.mask(info.local_values_exc,",","R$ ",".")}</td>

                                    </tr>
                                    <tr>
                                        <td>LDN</td>
                                        <td>{this.mask(info.ldn_minutes,":"," ")}</td>
                                        <td>{this.mask(info.ldn_values,",","R$ ",".")}</td>
                                        <td>{this.mask(info.ldn_minutes_exc,":"," ")}</td>
                                        <td>{this.mask(info.ldn_values_exc,",","R$ ",".")}</td>
                                    </tr>
                                    <tr>
                                        <td>Móvel</td>
                                        <td>{this.mask(info.movel_minutes,":"," ")}</td>
                                        <td>{this.mask(info.movel_values,",","R$ ",".")}</td>
                                        <td>{this.mask(info.movel_minutes_exc,":"," ")}</td>
                                        <td>{this.mask(info.movel_values_exc,",","R$ ",".")}</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>{this.mask( info.local_minutes 
                                                      + info.ldn_minutes 
                                                      + info.movel_minutes,":"," ")}</td>
                                        <td>{this.mask( info.local_values 
                                                      + info.ldn_values 
                                                      + info.movel_values,",","R$ ",".")}</td>
                                        <td>{this.mask(this.minutes(( info.local_minutes_exc
                                                          + info.ldn_minutes_exc
                                                          + info.movel_minutes_exc)),":"," ")}</td>
                                        <td>{this.mask( info.local_values_exc
                                                      + info.ldn_values_exc
                                                      + info.movel_values_exc,",","R$ ",".")}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>
                    )))
        
        this.setState({info: response})
    }
    minutes = (time) =>{
        const part = (String(time === 0 ? '0.0' : time).split('.'))
        const total_time = ((parseInt(part[0])) === 0 ? 0 : (parseInt(part[0]))) + ((parseInt(part[1]) / 60) === 0 ? 0 : (parseInt(part[1]) / 60) )
        return total_time
    }
    total = () => {
        const total_geral = (Data.docs.map((ttl) => (ttl.total_STFC)).reduce((tt, next) => (tt + next)))
        const total_ext = (Data.docs.map((ttl) => (ttl.total)).reduce((tt, next) => (tt + next)))
        const total_llm = (Data.docs.map((ttl) => ( ttl.local_values
                                                  + ttl.ldn_values
                                                  + ttl.movel_values)).reduce((tt, next) => (tt + next)))
        const total_exc = (Data.docs.map((ttl) => ( ttl.local_values_exc
                                                  + ttl.ldn_values_exc
                                                  + ttl.movel_values_exc))).reduce((tt, next) => (tt + next))
        const total_min = (Data.docs.map((ttl) => ( this.minutes(ttl.local_minutes_exc
                                                  + ttl.ldn_minutes_exc
                                                  + ttl.movel_minutes_exc)
                                                  ))).reduce((tt, next) => (tt + next))
        this.setState({total:total_geral
                     , total_ext: total_ext
                     , total_llm: total_llm
                     , total_exc: total_exc
                     , total_min: total_min})
    }

    mask = (Value,Decimal,Prefix,TS) => {
        const valor = (<Currency displayType={'text'}
                            value={Value}
                            thousandSeparator={TS}
                            decimalSeparator={Decimal}
                            prefix={Prefix}
                            decimalScale={2}
                            fixedDecimalScale={true}/>)
        return valor
    }

    render(){
        const { selectedYear, selectedMonth, info, total, total_ext, total_llm, total_exc, total_min} = this.state;
        return(
            <div className="main-billing">
                <h1>Relatório de Faturamento</h1>
                <div className="finders">    
                    <Select
                        className="selectedYear"
                        value={selectedYear}
                        onChange={this.yearChange}
                        options={year}
                        placeholder="Selecione o Ano"
                        isSearchable/>
                    <Select
                        className="selectedMonth"
                        value={selectedMonth}
                        onChange={this.monthChange}
                        options={month}
                        placeholder="Selecione o Mês"
                        isSearchable/>
                    <button className="findButton">Buscar</button>
                    <button className="download">Download</button>
                </div>
                <div>
                    <Tabs>
                        <div label="Consolidado">
                            <div className="total">
                                <h1>Total Geral</h1>
                                <p>Total Serviços:{this.mask(total,",","R$ ",".")}</p>
                                <p className="ttl">Total Ramais: {this.mask(total_ext,",","R$ ",".")}</p>
                                <p className="ttl">Total Franquias: {this.mask(total_llm,",","R$ ",".")}</p>
                                <p className="ttl">Total Excedentes: {this.mask(total_exc,",","R$ ",".")}</p>
                                <p className="ttl">Total Minutos: {this.mask(this.minutes(total_min),":"," ")}</p>
                            </div>
                            <div className="flex">
                                {info}
                            </div>
                            See you Later,<em> Alligator...</em>
                        </div>
                        
                        <div label="Detalhado">
                            <div className="flex">
                               <Detail />   
                            </div>
                        </div>

                    </Tabs>
                </div>
            </div>
        )
    }
}