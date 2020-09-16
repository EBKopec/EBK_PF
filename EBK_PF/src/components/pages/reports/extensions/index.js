import React, { Component } from 'react';
import Select from 'react-select';
import Tabs from '../../../tabs/tabs';
import Table from '../table/table';
import Data from '../../../services/api';
import Banner from '../../../banner/index';

import './styles.css'


const columns = "User_group.RAMAIS_ATIVOS.ATIVADOS_MES.EM_ATIVACAO.DESCONECTADOS";
const columns_2 = "User_group.linha.tipo_linha.DATA_VALIDACAO_CLIENTE.DATA_ENVIO_NOVA.DATA_CANCELAMENTO.status.DESCRICAO_LOCAL.DESCRICAO_SETOR";
const heads = [
    "GRUPO",
    "RAMAIS ATIVOS",
    "RAMAIS ATIVADOS MÊS CORRENTE",
    "RAMAIS PENDENTES ATIVAÇÃO",
    "RAMAIS DESCONECTADOS"
]
const heads_2 = [
    "GRUPO",
    "LINHA",
    "TIPO LINHA",
    "DATA DE ATIVAÇÃO",
    "DATA DE CADASTRO",
    "DATA DE DESCONEXÃO",
    "STATUS",
    "DESCRIÇÃO LOCAL",
    "DESCRIÇÃO SETOR"
]


export default class Extensions extends Component {
    constructor() {
        super();
        this.state = {
            info: [],
            content: [],
            contentInfo: {},
            page: 1,
            pages: 1,
            year: null,
            month: null,
            ext: null,
            selectedExt: null,
            selectedYear: new Date().getFullYear(),
            selectedMonth: parseInt(new Date().getMonth()) + 1
        }
    };
    componentDidMount = () => {
        this.loadContent();
        this.loadContentMonth();
        this.loadYearMonth();
        this.listExts();
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
    listExts = async () => {
        const exts = await Data.get(`/listExts`);
        let ext = exts.data.map((id_exts) => { return {value: id_exts.linha, label: id_exts.linha}});
        this.setState({ext: ext});
    }

    loadContent = async () => {
        const { selectedYear, selectedMonth } = this.state
        try {
            const YM = (this.state.selectedYear.value && this.state.selectedMonth.value) === undefined ? `${selectedYear}${selectedMonth}` : `${this.state.selectedYear}${this.state.selectedMonth}`;
            // console.log(`EXT ${ext} e YM ${YM}`);
            const response = await Data.get(`/extensionqty/${YM}`);
            // console.log('Resp', response.data);
            const { data } = response
            this.setState({ content: data });
        } catch (error) {
            console.log(error);
        }
    };

    loadContentMonth = async (page = 1) => {
        const { selectedYear, selectedMonth } = this.state;
        try {
            var response;
            if ( selectedYear === null ){
                response = await Data.get(`/exts/all?page=${page}`);
            } else {
                const YM = ((this.state.selectedYear.value && this.state.selectedMonth.value) === undefined)  ? `${selectedYear}${selectedMonth}` : `${this.state.selectedYear.value}${this.state.selectedMonth.value}`;
                response = await Data.get(`/extmonth/${YM}?page=${page}`);
                
            }
            
            const { docs, ...contentInfo } = response.data;
            console.log('docs', docs);
            this.setState({ info: docs, contentInfo, page })
        } catch (error) {
            console.log(error);
        }
    }

    yearChange = selectedYear => {
        this.setState({ selectedYear });
        console.log(`Year Selected: `, selectedYear);
    };
    monthChange = selectedMonth => {
        this.setState({ selectedMonth });
        console.log(`Month Selected: `, selectedMonth);
    };
    extChange = selectedExt => {
        this.setState({ selectedExt });
        console.log(`Ext Selected: `, selectedExt);
    }

    handleSubmit = async () => {
        const { selectedYear, selectedMonth } = this.state
        try {
            const YM = (this.state.selectedYear.value && this.state.selectedMonth.value) === undefined ? `${selectedYear}${selectedMonth}` : `${this.state.selectedYear.value}${this.state.selectedMonth.value}`
            const respQty = await Data.get(`/extensionqty/${YM}`);
            const respMonth = await Data.get(`/extmonth/${YM}`);
            const { data } = respQty;
            const { docs, ...contentInfo } = respMonth.data;
            // console.log(contentInfo);
            this.setState({ content: data, info: docs, contentInfo, page: 1, pages: contentInfo.pages, selectedExt:null });
        } catch (error) {
            console.log(error);
        }
    }

    handleSubmitExt = async () => {
        const { selectedExt } = this.state
        // console.log('SelectedExt', selectedExt);
        try {
            const ext = selectedExt === undefined || selectedExt === null ? `all` : `${selectedExt.value}`
            console.log('All',selectedExt);
            const exts = await Data.get(`/exts/${ext}`);
            console.log('exts', exts);
            const { docs, ...contentInfo } = exts.data;
            // console.log('docs', docs);
            this.setState({ info: docs, contentInfo, page: 1, pages: contentInfo.pages, selectedMonth: null, selectedYear: null });
        } catch (error) {
            console.log(error);
        }
    }
    showExts = () => {
        const { content } = this.state;
        // console.log('Content', this.state);
        const showExts = (
            <div className="groupsExt">
                <div className="table">
                    <Table Header={heads} data={content} columns={columns} />
                </div>
            </div>
        )
        return showExts;
    }

    showExtsMonths = () => {
        const { info, page, pages } = this.state;
        // console.log("Pages", pages);
        const showExtsMonths = (
            <div className="groupsExt">
                <div className="table">
                    <Table Header={heads_2} data={info} columns={columns_2} />
                </div>
                <div className="actions">
                    <button disabled={page <= 1} onClick={this.firstPage}>Primeira Página</button>
                    <button disabled={page <= 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={true}>Página {page} de {pages}</button>
                    <input placeholder="Insira a Página" name="page" ref="newPage" />
                    <button onClick={this.findPage}>Buscar</button>
                    <button disabled={page >= pages} onClick={this.nextPage}>Próximo</button>
                    <button disabled={page >= pages} onClick={this.lastPage}>Última Página</button>
                </div>
            </div>
        )
        return showExtsMonths;
    }

    prevPage = () => {
        const { page } = this.state;
        //contentInfo
        if (page <= 1) return;
        const pageNumber = page - 1;
        // console.log(`Current Page: ${page}, Previous Page ${pageNumber}`)
        this.loadContentMonth(pageNumber);

    };
    nextPage = () => {
        const { page, contentInfo } = this.state;
        // console.log(this.state);
        if (page >= contentInfo.pages) return;
        const pageNumber = page + 1;
        // console.log(`Current Page: ${page}, Next Page: ${pageNumber}`);
        this.loadContentMonth(pageNumber);
    };

    firstPage = () => {
        const { page } = this.state;
        if (page <= 1) return;
        const pageNumber = 1;
        this.loadContentMonth(pageNumber);
    }

    lastPage = () => {
        const { page, contentInfo } = this.state;
        // console.log('Last Page:', pages);
        if (page >= contentInfo.pages) return;
        this.loadContentMonth(contentInfo.pages);
    };

    findPage = () => {
        const { contentInfo } = this.state;
        if ((this.refs.newPage.value < 1) || (this.refs.newPage.value > contentInfo.Pages)) {
            alert('A página solicitada não existe. Favor corrigir sua busca.');
            return;
        }
        const page = this.refs.newPage.value;
        this.loadContentMonth(parseInt(page));
    };

    render() {

        const { selectedYear, selectedMonth, selectedExt, year, month, ext } = this.state;
        return (
            <div>
                <Banner />
                <div className="main-extension">
                    <h1>Relatório de Ramais</h1>
                    <div className="extension">
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
                        <Select
                            className="selectedExt"
                            value={selectedExt}
                            onChange={this.extChange}
                            options={ext}
                            placeholder="Selecione o Ramal"
                            isSearchable />
                        <button className="findButton" onClick={this.handleSubmitExt}>Ramal</button>
                    </div>
                    <Tabs>
                        <div label="Relatório Sumarizado">
                            <div className="exts">
                                {this.showExts()}
                            </div>
                        </div>
                        <div label="Relatório Descritivo">
                            <div className="extMonths">
                                {this.showExtsMonths()}
                            </div>
                        </div>
                      

                    </Tabs>

                </div>
            </div>
        )


    }
}