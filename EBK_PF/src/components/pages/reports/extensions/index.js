import React, { Component } from 'react';
import Select from 'react-select';
import Tabs from '../../../tabs/tabs';
import './styles.css'
const year = [
    {value: 2015, label:2015},
    {value: 2016, label:2016},
    {value: 2017, label:2017},
    {value: 2018, label:2018},
    {value: 2019, label:2019},
    {value: 2020, label:2020}
];
const month = [{value:1,label:'Janeiro'},
               {value:2,label:'Fevereiro'},
               {value:3,label:'Março'},
               {value:4,label:'Abril'},
               {value:5,label:'Maio'},
               {value:6,label:'Junho'},
               {value:7,label:'Julho'},
               {value:8,label:'Agosto'},
               {value:9,label:'Setembro'},
               {value:10,label:'Outubro'},
               {value:11,label:'Novembro'},
               {value:12,label:'Dezembro'}]

export default class Extensions extends Component {
    state = {
        selectedYear: null,
        selectedMonth: null
    }

    yearChange = selectedYear =>{
        this.setState({ selectedYear });
        console.log(`Year Selected: `, selectedYear);
    };
    monthChange = selectedMonth =>{
        this.setState({ selectedMonth });
        console.log(`Month Selected: `, selectedMonth);
    };


    render(){

        const { selectedYear, selectedMonth } = this.state;

        return (
            <div className="main-extension">
                <h1>Relatório de Ramais</h1>
                <div className="extension">    
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
                </div>
                <div>
                    <Tabs>
                        <div label="Relatório Sumarizado">See you Later,<em>Alligator</em></div>
                        <div label="Relatório Descritivo">After 'while, <em>Crocodile</em>!</div>
                    </Tabs>
                </div>
            </div>
        )


    }
}