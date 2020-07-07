import React, { Component } from 'react';
// import Tabs from '../../../../tabs/tabs';
import { Tab, Tabs} from '@material-ui/core';
import Table from '../../table/table2';
import Data from '../../../../services/api';

import './styles.css';

const heads = ["TIPO",
            "ORIGEM", 
            "DATA" ,
            "HORA",
            "DESTINO",
            "CIDADE DESTINO", 
            "DURAÇÃO",  
            "CUSTO ( R$ )"
        ]

export default class Detailed extends Component {
    constructor(){
        super()
        this.state = {
                content: [],
                contentInfo: {},
                page: 1,
                tabIndex: 0,
                setValue:0
        }
    }

    componentDidMount() {
        this.loadContent();
    }

    loadContent = async (page = 1) => {
        try {
            const route = this.state.setValue === null ? null : this.state.setValue;
            const post = await Data.post(`/billing/${route}?page=${page}`);
            const { docs, ...contentInfo } = post.data
            // console.log("Docs", response.data);
            // const { docs, ...contentInfo } = response.data;
            this.setState({ content: docs, contentInfo, page, route});
        } catch (error) {
            console.log(error);
        }

    };

    prevPage = () => {
        const {page} = this.state;
        //contentInfo
        if (page <= 1) return;
        const pageNumber = page - 1;
        // console.log(`Current Page: ${page}, Previous Page ${pageNumber}`)
        this.loadContent(pageNumber);

    };
    nextPage = () => {
        const {page, contentInfo} = this.state;
        // console.log("Paginas", page, contentInfo);
        if (page >= contentInfo.pages) return;
        const pageNumber = page + 1;
        // console.log(`Current Page: ${page}, Next Page: ${pageNumber}`);
        this.loadContent(pageNumber);
    };

    firstPage = () =>{
        const {page} = this.state;
        if (page <= 1) return;
        const pageNumber = 1;
        this.loadContent(pageNumber);
    }
   
    lastPage = () => {
        const {page, contentInfo} = this.state;
        if (page >= contentInfo.pages) return;
        // console.log('Last Page:', page);
        this.loadContent(contentInfo.pages);
    };

    findPage = () => {
        const {contentInfo} = this.state;
        if ( ( this.refs.newPage.value < 1 ) || (this.refs.newPage.value > contentInfo.pages)){
            alert('A página solicitada não existe. Favor corrigir sua busca.');
            return;
        }
            const page = this.refs.newPage.value;
            // console.log(typeof parseInt(page))
            this.loadContent(parseInt(page));
    };

    handleChange = async (event, newValue) => {
        try {

            const page = 1;
            const value = newValue;
            const post = await Data.post(`/billing/${value}?page=${page}`);
            const { docs, ...contentInfo } = post.data
            this.setState({setValue:value, content: docs, contentInfo, page});
        } catch (error) {
            console.log(error);
        }
    };
    
    render() {
        const { content, page, contentInfo} = this.state;
        // console.log("Estado:", content);
        return (
            <div className="groups">
                <Tabs className="tabs" onChange={this.handleChange}>
                    <Tab className={this.state.setValue === 0 ? "activated" : "tab"} label="PMPG"/>
                    <Tab className={this.state.setValue === 1 ? "activated" : "tab"} label="PMPG 0800"/>
                    <Tab className={this.state.setValue === 2 ? "activated" : "tab"} label="SME ESCOLA"/>
                    <Tab className={this.state.setValue === 3 ? "activated" : "tab"} label="SME CMEI"/>
                    <Tab className={this.state.setValue === 4 ? "activated" : "tab"} label="FMS PAB"/>
                    <Tab className={this.state.setValue === 5 ? "activated" : "tab"} label="FMS PAB 0800"/>
                    <Tab className={this.state.setValue === 6 ? "activated" : "tab"} label="FMS AIH"/>
                    <Tab className={this.state.setValue === 7 ? "activated" : "tab"} label="FMS AIH 0800"/>
                </Tabs>
                <div className="table">
                    <Table Header={heads} data={content}/>
                </div>
                <div className="actions">
                    <button disabled={page <= 1} onClick={this.firstPage}>Primera Página</button>
                    <button disabled={page <= 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={true}>Página {page} de {contentInfo.pages}</button>
                    <input placeholder="Insira a Página" name="page" ref="newPage" />
                    <button onClick={this.findPage}>Buscar</button>
                    <button disabled={page >= contentInfo.pages} onClick={this.nextPage}>Próximo</button>
                    <button disabled={page >= contentInfo.pages} onClick={this.lastPage}>Última Página</button>
                </div>
                
            </div>
        )
    }




}
