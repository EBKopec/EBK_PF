import React, { Component } from 'react';
// import Tabs from '../../../../tabs/tabs';
import { Tab, Tabs } from '@material-ui/core';
import Table from '../../table/table';
import Data from '../../../../services/api';

import './styles.css';
const columns = "TIPO.ORIGEM.DATA.HORA.DESTINO.CIDADE_DESTINO.DURACAO_REAL.CUSTO";
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
    constructor(props){
        super(props)
        // const { selectedYear,selectedMonth} = this.props;
        this.state = {
                content: [],
                contentInfo: {},
                page: 1,
                tabIndex: 0,
                selectedTab:0,
                selectedYear: new Date().getFullYear(),
                selectedMonth: parseInt(new Date().getMonth()) + 1, 

        }
    }

    componentDidMount() {
        
            this.loadContent();   
    }
    componentDidUpdate(){
        // console.log("Did Update", this.props);
        const propsYM = `${this.props.selectedYear.value}${this.props.selectedMonth.value}`;
        const stateYM = `${this.state.selectedYear}${this.state.selectedMonth}`;
        // console.log('propsYM', propsYM, 'stateYM', stateYM);
        if ( propsYM !== stateYM ){
            this.loadContent();
            this.setState({selectedYear: this.props.selectedYear.value, selectedMonth: this.props.selectedMonth.value })
        }


    }


    loadContent = async (page = 1) => {
        try {
            // console.log('DidMount', this.props);
            // const { loadContent } = this.props;
            const route = this.state.selectedTab === null ? null : this.state.selectedTab;
            const YM = `${this.props.selectedYear.value}${this.props.selectedMonth.value}`
            const post = await Data.post(`/billing/${route}/${YM}?page=${page}`);
            console.log('Post', post);
            // console.log('POST', post);
            const { docs, ...contentInfo } = post.data
            // console.log("Docs", response.data);
            // const { docs, ...contentInfo } = response.data;
            this.setState({ content: docs, contentInfo, page, route, selectedYear: this.props.selectedYear.value, selectedMonth: this.props.selectedMonth.value});
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
        // console.log(this, this.props.selectedYear);
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
            const YM = `${this.props.selectedYear.value}${this.props.selectedMonth.value}`
            const post = await Data.post(`/billing/${value}/${YM}/?page=${page}`);
            const { docs, ...contentInfo } = post.data
            this.setState({selectedTab:value, content: docs, contentInfo, page});
        } catch (error) {
            console.log(error);
        }
    };
    
    render() {
        const { content, page, contentInfo} = this.state;
        // console.log("Estado:", content);
        return (
            <div className="groups">
                <Tabs className="tabs" onChange={this.handleChange} value={this.state.selectedTab}>
                    <Tab className={this.state.selectedTab === 0 ? "activated" : "tab"} label="PMPG"/>
                    <Tab className={this.state.selectedTab === 1 ? "activated" : "tab"} label="PMPG 0800"/>
                    <Tab className={this.state.selectedTab === 2 ? "activated" : "tab"} label="SME ESCOLA"/>
                    <Tab className={this.state.selectedTab === 3 ? "activated" : "tab"} label="SME CMEI"/>
                    <Tab className={this.state.selectedTab === 4 ? "activated" : "tab"} label="FMS PAB"/>
                    <Tab className={this.state.selectedTab === 5 ? "activated" : "tab"} label="FMS PAB 0800"/>
                    <Tab className={this.state.selectedTab === 6 ? "activated" : "tab"} label="FMS AIH"/>
                    <Tab className={this.state.selectedTab === 7 ? "activated" : "tab"} label="FMS AIH 0800"/>
                </Tabs>
                <div className="table">
                    <Table Header={heads} data={content} columns={columns}/>
                </div>
                <div className="actions">
                    <button disabled={page <= 1} onClick={this.firstPage}>Primeira Página</button>
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
