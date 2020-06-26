import React, { Component } from 'react';
import Tabs from '../../../../tabs/tabs';
import Table from '../../table/table2';
import Data from '../../../../services/api';
import { JsonToTable } from "react-json-to-table";
import './styles.css';

const heads = ["TIPO",
            "ORIGEM", 
            "DATA" ,
            "HORA",
            "DESTINO",
            "CIDADE DESTINO", 
            "DURAÇÃO",  
            "CUSTO"
        ]

export default class Detailed extends Component {
    state = {
            content: [],
            contentInfo: {},
            page: 1
    }

    componentDidMount() {
        this.loadContent();
    }

    loadContent = async (page = 1) => {
        try {
            const response = await Data.get(`/billing?page=${page}`);
            // console.log("Response", response); 
            // console.log("Docs", response.data);
            const { docs, ...contentInfo } = response.data;
            this.setState({ content: docs, contentInfo, page});
        } catch (error) {
            console.log(error);
        }

    };

    prevPage = () => {
        const {page} = this.state;
        //contentInfo
        if (page === 1) return;
        const pageNumber = page - 1;
        // console.log(`Current Page: ${page}, Previous Page ${pageNumber}`)
        this.loadContent(pageNumber);

    };
    nextPage = () => {
        const {page, contentInfo} = this.state;
        // console.log("Paginas", page, contentInfo);
        if (page === contentInfo.pages) return;
        const pageNumber = page + 1;
        // console.log(`Current Page: ${page}, Next Page: ${pageNumber}`);
        this.loadContent(pageNumber);
    };

    firstPage = () =>{
        const {page} = this.state;
        if (page === 1) return;
        const pageNumber = 1;
        this.loadContent(pageNumber);
    }
   
    lastPage = () => {
        const {page, contentInfo} = this.state;
        if (page === contentInfo.pages) return;
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
            console.log(typeof parseInt(page))
            this.loadContent(parseInt(page));
    };

    render() {
        const { content, page, contentInfo } = this.state;
        // console.log("Console: ", contentInfo.pages);
        return (
            <div>
                <Tabs className="tb">
                    <div label="PMPG">
                        <div>
                            <Table Header={heads} data={content} />
                        </div>
                        <div className="actions">
                            <button disabled={page === 1} onClick={this.firstPage}>Primera Página</button>
                            <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                            <button disabled={true}>Página {page} de {contentInfo.pages}</button>
                            <input placeholder="Insira a Página" name="page" ref="newPage" />
                            <button onClick={this.findPage}>Buscar</button>
                            <button disabled={page === contentInfo.pages} onClick={this.nextPage}>Próximo</button>
                            <button disabled={page === contentInfo.pages} onClick={this.lastPage}>Última Página</button>
                        </div>
                    </div>
                    <div label="PMPG 0800">
                        <div>
                            <h1>Teste PMPG 0800</h1>
                        </div>
                    </div>
                    <div label="SME ESCOLA">
                        <div>
                            <h1>Teste SME ESCOLA</h1>
                        </div>
                    </div>
                    <div label="SME CMEI">
                        <div>
                            <h1>Teste SME CMEI</h1>
                        </div>
                    </div>
                    <div label="FMS PAB">
                        <div>
                            <h1>Teste FMS PAB</h1>
                        </div>
                    </div>
                    <div label="FMS PAB 0800">
                        <div>
                            <h1>Teste FMS PAB 0800</h1>
                        </div>
                    </div>
                    <div label="FMS AIH">
                        <div>
                            <h1>Teste FMS AIH</h1>
                        </div>
                    </div>
                    <div label="FMS AIH 0800">
                        <div>
                            <h1>Teste FMS AIH 0800</h1>
                        </div>
                    </div>
                </Tabs>
            </div>
        )
    }




}