import React, {Component} from 'react';
import Select from 'react-select';
import Tabs from '../../../../tabs/tabs';
import Detail from '../detailed/index';
// import Api from '../../../services/api_ramais';
// import Table from '../table/index';
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

// const heads = {
//     group:"Grupo",
//     STFC: "Serviço Total", 
//     ext: "Ramais" ,
//     total: "Total Consumido",
//     local_minutes:"Minutos Local",
//     local_values: "Valor Local", 
//     ldn_minutes:"Minutos LDN",  
//     ldn_values: "Valor LDN",
//     movel_minutes:"Minutos Móvel",
//     movel_values: "Valor Móvel",
//     local_minutes_exc:"Excedentes Minutos Local",
//     local_values_exc: "Excendentes Valores Local", 
//     ldn_minutes_exc:"Excedentes Minutos LDN",
//     ldn_values_exc: "Excendentes Valores LDN",
//     movel_minutes_exc:"Excedentes Minutos Móvel",
//     movel_values_exc: "Excedentes Valores Móvel"
// }

export default class Billing extends Component {
    state = {
        selectedYear: null,
        selectedMonth: null,
        info: [],
        page: 1,
    };
    componentDidMount(){
        this.mapping();
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
                                <li>Serviço: {info.service}</li>
                                <li>Ramais: {info.ext}</li>
                                <li>Total Consumido: {info.total}</li>
                                <li>Total Serviço: {info.total_STFC}</li>
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
                                        <td>{info.local_minutes}</td>
                                        <td>{info.local_values}</td>
                                        <td>{info.local_minutes_exc}</td>
                                        <td>{info.local_values_exc}</td>

                                    </tr>
                                    <tr>
                                        <td>LDN</td>
                                        <td>{info.ldn_minutes}</td>
                                        <td>{info.ldn_values}</td>
                                        <td>{info.ldn_minutes_exc}</td>
                                        <td>{info.ldn_values_exc}</td>
                                    </tr>
                                    <tr>
                                        <td>Móvel</td>
                                        <td>{info.movel_minutes}</td>
                                        <td>{info.movel_values}</td>
                                        <td>{info.movel_minutes_exc}</td>
                                        <td>{info.movel_values_exc}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </article>
                    )))
        
        this.setState({info: response})
    }

    render(){
        const { selectedYear, selectedMonth, info} = this.state;
        //console.log(info);
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
                            <div className="flex">
                            {info}
                            </div>
                            See you Later,<em> Alligator...</em>
                        </div>
                        
                        <div label="Detalhado">
                            <div className="flex">
                               <Detail className="Detail"/>   
                            </div>
                        </div>

                    </Tabs>
                </div>
            </div>
        )
    }
}