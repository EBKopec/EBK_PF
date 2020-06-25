import React, { Component } from 'react';
import Select from 'react-select';
import Tabs from '../../../tabs/tabs';
import Table from '../table/index';

import './styles.css'
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


const data = [
    { name: 'PMPG',         ext: 816,   extProgress: 2, extActivated: 2, extDisconnected: 0 , extCanceled: 0},
    { name: 'SME ESCOLA',   ext: 105,   extProgress: 0, extActivated: 0, extDisconnected: 0 , extCanceled: 0},
    { name: 'SME CMEI',     ext: 62,    extProgress: 0, extActivated: 0, extDisconnected: 0 , extCanceled: 0},
    { name: 'FMS PAB',      ext: 230,   extProgress: 4, extActivated: 4, extDisconnected: 0 , extCanceled: 0},
    { name: 'FMS AIH',      ext: 139,   extProgress: 0, extActivated: 0, extDisconnected: 0 , extCanceled: 0},
];

const data2 = [
    { name: 'PMPG',        extProgress: 2, extActivated: 2, installDate: '10/04/2020' , activationDate: '22/04/2020'},
    { name: 'SME ESCOLA',  extProgress: 0, extActivated: 0, installDate: '' , activationDate: ''},
    { name: 'SME CMEI',    extProgress: 0, extActivated: 0, installDate: '' , activationDate: ''},
    { name: 'FMS PAB',     extProgress: 4, extActivated: 4, installDate: '15/04/2020' , activationDate: '27/04/2020'},
    { name: 'FMS AIH',     extProgress: 0, extActivated: 0, installDate: '' , activationDate: ''},
];

const data3 = [
    { name: 'PMPG',        extDisconnected: 0, disconnectedDate: '' },
    { name: 'SME ESCOLA',  extDisconnected: 0, disconnectedDate: '' },
    { name: 'SME CMEI',    extDisconnected: 0, disconnectedDate: '' },
    { name: 'FMS PAB',     extDisconnected: 0, disconnectedDate: '' },
    { name: 'FMS AIH',     extDisconnected: 0, disconnectedDate: '' },
];

const data4 = [
    { name: 'PMPG',        extCanceled: 0, canceledDate: '' },
    { name: 'SME ESCOLA',  extCanceled: 0, canceledDate: '' },
    { name: 'SME CMEI',    extCanceled: 0, canceledDate: '' },
    { name: 'FMS PAB',     extCanceled: 0, canceledDate: '' },
    { name: 'FMS AIH',     extCanceled: 0, canceledDate: '' },
];

const head = {
    name: 'Grupo',
    ext: 'Ramais Ativos',
    extProgress: 'Ramais em Ativação',
    extActivated: 'Ramais Ativados no Mês',
    extDisconnected: 'Ramais Desconectados',
    extCanceled: 'Ramais Cancelados',
};

const head2 = {
    name: 'Grupo',
    extProgress: 'Ramais em Ativação',
    extActivated: 'Ramais Ativados no Mês',
    installDate: 'Data de Instalação',
    activationDate: 'Data de Ativação',
}

const head3 = {
    name: 'Grupo',
    extDisconnected: 'Ramais Desconectados',
    disconnectedDate: 'Data Desconexão',
}
const head4 = {
    name: 'Grupo',
    extCanceled: 'Ramais Cancelados',
    canceledDate: 'Data Cancelamento',
}

export default class Extensions extends Component {
    state = {
        selectedYear: null,
        selectedMonth: null,
    };

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
        console.log(data[1]);
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
                        <div label="Relatório Sumarizado">
                        <div>
                            <Table data={data} head={head}/>
                        </div>
                        See you Later,<em> Alligator...</em>
                        </div>
                        <div label="Relatório Descritivo">
                            <div>
                                <Table data={data2} head={head2}/>    
                            </div>
                            <div className="end-service">
                                <Table data={data3} head={head3}/>
                                <Table data={data4} head={head4}/>
                            </div>
                            After 'while, <em>Crocodile</em>!
                        </div>

                    </Tabs>
                </div>
                
            </div>
        )


    }
}