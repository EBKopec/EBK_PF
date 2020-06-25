import React, { Component } from 'react';

export default class Table extends Component {

    constructor(props) {
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
    }


    getKeys = function () {
        // const { data } = this.state;
        // console.log(data);
        //return Object.keys(this.state.data !== null ? this.state.data : { 'Error': 'Error' } );
        console.log("Props", Object.keys(this.props));
        return Object.keys(this.props.data);
    }

    getHeader = function () {
        const keys = this.getKeys();
        return keys.map((key, index) => {
            return <th key={key}>{key.toUpperCase()}</th>
        })
    }

    getRowsData = function () {
        var items = this.props.data;
        var keys = this.getKeys();
        return items.map((row, index) => {
            return <tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>
        })
    }

    render() {
        console.log(this.props.data !== null ? 'SIM' : 'Não');
        return (
            <div>
                <table>
                    <thead>
                        <tr>{this.getHeader()}</tr>

                    </thead>
                    <tbody>
                        {this.getRowsData()}
                    </tbody>
                </table>
            </div>

        );
    }
}
const RenderRow = (props) => {
    return props.keys.map((key, index) => {
        return <td key={props.data[key]}>{props.data[key]}</td>
    })
}